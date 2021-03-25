class Api::V1::MealsController < Api::V1::BaseController
  before_action :auth_jwt, only: %i[create update]

  def index
    @meals = Meal.where(restaurant_id: params.require(:restaurant_id)).order(:name)
  end

  def show
    @meal = Meal.find(params[:id])
  end

  def create
    @meal = Meal.new meal_params

    authorize @meal

    if @meal.save
      render :show, status: :created
    else
      render json: { errors: @meal.errors }, status: :unprocessable_entity
    end
  end

  def update
    @meal = Meal.find(params[:id])

    authorize @meal

    if @meal.update meal_params
      render :show, status: :ok
    else
      render json: { errors: @meal.errors }, status: :unprocessable_entity
    end
  end

  private

  def meal_params
    params.permit(:name, :description, :price, :restaurant_id)
  end
end
