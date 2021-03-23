class Api::V1::OrdersController < Api::V1::BaseController
  before_action :auth_jwt

  def index
    @orders = Order.all

    authorize @orders

    head 200
  end

  def show
    @order = Order.find(params[:id])

    authorize @order

    render json: @order, status: 200
  end
end
