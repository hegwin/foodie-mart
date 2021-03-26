require 'rails_helper'

RSpec.describe Order, type: :model do
  describe 'callbacks' do
    let(:restaurant) { create :restaurant }
    let!(:meal1) { create :meal, restaurant: restaurant }
    let!(:meal2) { create :meal, restaurant: restaurant }
    let(:user) { create :user }

    let(:order_params) do
      {
        user_id: user.id,
        restaurant_id: restaurant.id,
        shipping_info: {
          line1: '638 Huangpin S.'
        },
        order_items_attributes: [
          {
            meal_id: meal1.id,
            amount: 1
          },
          {
            meal_id: meal2.id,
            amount: 2
          }
        ]
      }
    end

    it 'calculates total price before create' do
      order = Order.create order_params

      expect(order.reload.total).to eq(meal1.price + meal2.price * 2)
    end
  end
end
