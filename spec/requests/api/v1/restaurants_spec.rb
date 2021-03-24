require 'rails_helper'

RSpec.describe 'Api::V1::Restaurants', type: :request do
  let(:owner) { create :user, :restaurant_owner }
  let(:token) { AuthnService.generate_token(owner.id) }
  let(:headers_for_owner) {{ Authorization: "Bearer #{token}" }}


  describe 'GET /api/v1/restaurants' do
    before do
      create_list :restaurant, 3
    end

    it 'returns 200' do
      get '/api/v1/restaurants'
      expect(response).to have_http_status(200)
    end

    context 'when geo info given' do
      let!(:nearest_restaurant) { create :restaurant, latitude: 30, longitude: 120 }

      it 'sorts by distance' do
        get '/api/v1/restaurants?latitude=30&longitude=120'
        expect(response).to have_http_status(200)

        result = JSON.parse(response.body)
        expect(result.first['id']).to eq(nearest_restaurant.id)
      end
    end
  end

  describe 'GET /api/v1/restaurants/my' do
    let!(:restaurant) { create_list :restaurant, 2, user: owner }

    it 'shows my restaurants' do
      get '/api/v1/restaurants/my', headers: headers_for_owner
      expect(response).to have_http_status(200)

      result = JSON.parse(response.body)

      expect(result.length).to eq(2)
      expect(result.pluck('id')).to match_array(owner.restaurants.pluck(:id))
    end
  end

  describe 'POST /api/v1/restaurants' do
    let(:params) do
      {
        name: 'Habit',
        description: 'Hamburgers'
      }

    end

    it 'creates a restaurant' do
      expect { post '/api/v1/restaurants', params: params, headers: headers_for_owner }.to change { Restaurant.count }.by(1)

    end

    it 'creates a restaurant for current user' do
      post '/api/v1/restaurants', params: params, headers: headers_for_owner
      expect(response).to have_http_status(200)
      expect(Restaurant.last.user).to eq(owner)
    end
  end

  describe 'PATCH /api/v1/restaurants/:id' do
    let!(:restaurant) { create :restaurant, user: owner }
    let(:another_user) { create :user, :restaurant_owner }

    it 'updates my restaurant' do
      patch "/api/v1/restaurants/#{restaurant.id}", params: { name: 'Sweet Green' }, headers: headers_for_owner

      expect(response).to have_http_status(200)
      expect(owner.restaurants.last.name).to eq 'Sweet Green'
    end

    it 'forbids other people to update my restaurant' do
      patch "/api/v1/restaurants/#{restaurant.id}", params: { name: 'Fire Devil' }, headers: { Authorization: "Bearer #{AuthnService.generate_token(another_user.id)}" }

      expect(response).to have_http_status(403)
    end
  end
end
