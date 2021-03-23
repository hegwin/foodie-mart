class OrderItem < ApplicationRecord
  belongs_to :order, required: false
  belongs_to :meal

  validates :amount, presence: true, numericality: { greater_than: 0, only_integer: true }

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
