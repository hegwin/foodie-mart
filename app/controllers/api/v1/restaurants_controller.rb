class Api::V1::RestaurantsController < Api::V1::BaseController
  before_action :auth_jwt, except: :index

  def index
    @restaurants = Restaurant.all

    @restaurants = @restaurants.near(params[:latitude], params[:longitude]) if params[:latitude].present? && params[:longitude].present?
  end

  def my
    @restaurants = RestaurantPolicy::Scope.new(current_user, Restaurant).resolve

    render 'index'
  end

  def create
    @restaurant = current_user.restaurants.new(restaurant_params)

    authorize @restaurant

    if @restaurant.save
      render json: @restaurant, status: 200
    else
      render json: { errors: @restaurant.errors }, status: 422
    end
  end

  def update
    @restaurant = Restaurant.find(params[:id])

    authorize @restaurant

    if @restaurant.update restaurant_params
      render json: @restaurant, status: 200
    else
      render json: { errors: @restaurant.errors }, status: 422
    end
  end

  private

  def restaurant_params
    params.permit(:name, :description, :latitude, :longitude, :image_url)
  end
end
