require 'rails_helper'

RSpec.describe 'Api::V1::Restaurants', type: :request do
  describe 'GET /api/v1/restaurants' do
    before do
      create_list :restaurant, 3
    end

    it 'returns 200' do
      get '/api/v1/restaurants'
      expect(response).to have_http_status(200)
    end
  end
end
