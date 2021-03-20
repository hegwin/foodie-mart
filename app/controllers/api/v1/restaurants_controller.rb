class Api::V1::RestaurantsController < Api::V1::BaseController
  def index
    @restaurants = Restaurant.all
  end
end
