class Order < ApplicationRecord
  include AASM

  belongs_to :user
  belongs_to :restaurant
  has_many :order_items

  validates :order_items, length: { minimum: 1 }
  validates :shipping_info, presence: true, on: :create
  validate :order_items_belong_to_one_restaurant, on: :create

  before_create :calculate_total
  after_initialize :assign_restaurant_id, if: :new_record?

  accepts_nested_attributes_for :order_items, reject_if: proc { |attributes| attributes[:amount].blank? || attributes[:meal_id].blank? }

  audited only: :status

  aasm column: :status do
    state :placed, initial: true
    state :canceled
    state :processing
    state :in_route
    state :delivered
    state :received

    event :cancel do
      transitions from: :placed, to: :canceled
    end

    event :confirm do
      transitions from: :placed, to: :processing
    end

    event :send_out do
      transitions from: :processing, to: :in_route
    end

    event :deliver do
      transitions from: :in_route, to: :delivered
    end

    event :confirm_receipt do
      transitions from: :delivered, to: :received
    end
  end

  private

  def assign_restaurant_id
    self.restaurant_id ||= order_items.first&.meal&.restaurant_id
  end

  def calculate_total
    self.total = order_items.map(&:subtotal).inject(:+)
  end

  def order_items_belong_to_one_restaurant
    errors.add(:order_items, 'must belong to one restaurant') unless order_items.map.map { |item| item.meal.restaurant_id }.uniq == [restaurant.id]
  end
end
