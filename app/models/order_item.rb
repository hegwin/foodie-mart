class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :meal

  after_validation :calculate_subtotal, on: :create
  after_validation :snapshoot_meal, on: :create

  private

  def calculate_subtotal
    self.subtotal = meal.price * amount
  end

  def snapshoot_meal
    self.meal_snapshot = meal.to_snapshot
  end
end
