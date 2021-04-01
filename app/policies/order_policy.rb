class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.is_restaurant_owner?
        scope.where(restaurant: user.restaurants)
      else
        scope.where(user: user)
      end
    end
  end

  def create?
    user.is_regular? && !Blacklist.exists?(user: user, restaurant_owner: record.restaurant.user)
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

  def send_out?
    confirm?
  end

  def deliver?
    confirm?
  end

  def confirm_receipt?
    cancel?
  end
end
