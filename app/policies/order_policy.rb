class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    user.present?
  end

  def create?
    user.present?
  end

  def show?
    record.user_id == user.id ||
      user.restaurants.select(:id).include?(record.restaurant_id)
  end

  def cancel?
    record.user_id == user.id
  end

  def confirm?
    user.restaurants.select(:id).include? record.restaurant_id
  end
end
