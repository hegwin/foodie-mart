class RestaurantPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user && user.is_restaurant_owner?
        scope.where(user: user)
      else
        scope.none
      end
    end
  end

  def create?
    user.is_restaurant_owner?
  end

  def update?
    user.is_restaurant_owner? && record.user_id == user.id
  end
end
