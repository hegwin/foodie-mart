class MealPolicy < ApplicationPolicy
  def create?
    user.is_restaurant_owner? && user.restaurants.include?(record.restaurant)
  end

  def update?
    user.is_restaurant_owner? && user.restaurants.include?(record.restaurant)
  end
end
