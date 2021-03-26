require 'rails_helper'

RSpec.describe Meal, type: :model do
  describe '#to_snapshot' do
    let(:meal) { create :meal }

    it 'returns a hash with proper keys' do
      result = meal.to_snapshot

      expect(result).to be_a Hash
      expect(result.keys).to eq %i[name description price image_url]
    end
  end
end
