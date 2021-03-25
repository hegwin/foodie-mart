class MealPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user.is_restaurant_owner? && user.restaurants.include?(record.restaurant)
  end

  def update?
    user.is_restaurant_owner? && user.restaurants.include?(record.restaurant)
  end
end
