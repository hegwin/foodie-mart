class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    attr_reader :restaurant_params

    def initialize(user, scope, restaurant_params)
      super(user, scope)
      @restaurant_params = restaurant_params
    end

    def resolve
      if user.is_restaurant_owner?
        restaurant_id = restaurant_params.require(:restaurant_id).to_i
        if user.restaurants.pluck(:id).include?(restaurant_id)
          scope.where(restaurant_id: restaurant_id)
        else
          raise Pundit::NotAuthorizedError
        end
      else
        scope.where(user: user)
      end
    end
  end

  def create?
    user.is_regular?
  end

  def show?
    record.user_id == user.id ||
      user.restaurants.pluck(:id).include?(record.restaurant_id)
  end

  def cancel?
    record.user_id == user.id
  end

  def confirm?
    user.restaurants.pluck(:id).include? record.restaurant_id
  end
end
