require 'rails_helper'

RSpec.describe OrderPolicy, type: :policy do
  let(:user) { create :user }
  let(:restaurant_owner) { create :user, :restaurant_owner }
  let(:restaurant) { create :restaurant, user: restaurant_owner }

  subject { described_class }

  permissions :confirm? do
    it 'grants access when belongs to restaurant owner' do
      record = Order.new restaurant: restaurant
      expect(subject).to permit(restaurant_owner, record)
    end

    it 'denies access if it is other restaurant order' do
      record = Order.new restaurant_id: restaurant.id + 1
      expect(subject).not_to permit(restaurant_owner, record)
    end
  end

  permissions :confirm_receipt? do
    it 'grants access when belongs to user' do
      expect(subject).to permit(user, Order.new(user: user))
    end
  end
end
