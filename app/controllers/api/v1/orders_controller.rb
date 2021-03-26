class Api::V1::OrdersController < Api::V1::BaseController
  before_action :auth_jwt
  before_action :load_order, except: %i[index create]

  rescue_from AASM::InvalidTransition, with: :state_change_denied

  def index
    @orders = OrderPolicy::Scope.new(current_user, Order, params.permit(:restaurant_id)).resolve.includes(:user, :restaurant).order(created_at: :desc)

    @orders = @orders.where(status: params[:status_eq]) if params[:status_eq].present?
  end

  def create
    @order = Order.new create_order_params

    if @order.save
      render :show, status: :created
    else
      render json: { errors: @order.errors }, status: :unprocessable_entity
    end
  end

  def show
    authorize @order
  end

  Order.aasm.events.map(&:name).each do |event_name|
    define_method event_name do
      @order.send "#{event_name}!"
      render :show
    end
  end

  private

  def create_order_params
    params.require(:order_items_attributes)

    params.permit(:restaurant_id, shipping_info: %i[line1 line2 zip_code phone] , order_items_attributes: %i[meal_id amount]).merge(user_id: current_user.id)

  end

  def load_order
    @order = Order.includes(:order_items, :user, :restaurant).find(params[:id])
  end

  def state_change_denied
    head :forbidden
  end
end
