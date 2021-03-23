class Order < ApplicationRecord
  include AASM

  belongs_to :user
  belongs_to :restaurant
  has_many :order_items

  validates :order_items, :length => { minimum: 1 }

  before_create :calculate_total

  accepts_nested_attributes_for :order_items, reject_if: proc { |attributes| binding.pry; attributes[:amount].blank? || attributes[:meal_id].blank? }

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

    event :dispatch do
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

  def calculate_total
    self.total = order_items.map(&:subtotal).inject(:+)
  end
end
