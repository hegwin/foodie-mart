require 'rails_helper'

RSpec.describe 'Api::V1::Meals', type: :request do
  let(:user) { create :user, :restaurant_owner }
  let(:restaurant) { create :restaurant, user: user }
  let(:another_restaurant) { create :restaurant }

  let(:token) { AuthnService.generate_token(user.id) }
  let(:headers) { { Authorization: "Bearer #{token}" } }

  describe 'GET /api/v1/meals' do
    before do
      create_list :meal, 3, restaurant: restaurant
      create_list :meal, 3, restaurant: another_restaurant
    end

    it 'lists meals of a restaurant' do
      get "/api/v1/meals?restaurant_id=#{restaurant.id}"
      expect(response).to have_http_status(200)

      result = JSON.parse(response.body)
      expect(result.count).to eq(3)
    end

    it 'returns 422 when restaurant_id not provided' do
      get '/api/v1/meals'
      expect(response).to have_http_status(422)
    end
  end

  describe 'POST /api/v1/meals' do
    let(:valid_params) do
      {
        restaurant_id: restaurant.id,
        name: "Hawaii Pizza",
        price: 12,
        description: "Topped with tomato sauce, cheese, pineapple, and either ham or bacon."
      }
    end
    let(:invalid_params) do
      {
        restaurant_id: restaurant.id,
        name: "Hawaii Pizza",
        price: 0,
        description: "Topped with tomato sauce, cheese, pineapple, and either ham or bacon."
      }
    end

    it 'creates a meal' do
      expect { post '/api/v1/meals', params: valid_params, headers: headers }.to \
        change { restaurant.meals.count }.by(1)
    end

    it 'returns 201 with meal object' do
      post '/api/v1/meals', params: valid_params, headers: headers
      expect(response).to have_http_status(201)

      result = JSON.parse(response.body)
      expect(result.keys).to include('id', 'name', 'description')
    end

    it 'returns 422 when price in invalid' do
      post '/api/v1/meals', params: invalid_params, headers: headers
      expect(response).to have_http_status(422)
    end
  end

  describe 'GET /api/v1/meals/:id' do
    let!(:meal) { create :meal, restaurant: restaurant }

    it 'updates a meal' do
      patch "/api/v1/meals/#{meal.id}", params: { name: 'A new name' }, headers: headers
      expect(response).to have_http_status(200)
      expect(meal.reload.name).to eq 'A new name'
    end
  end

  describe 'PATCH /api/v1/meals/:id' do
    let!(:meal) { create :meal, restaurant: restaurant }

    it 'returns info of a meal' do
      get "/api/v1/meals/#{meal.id}"
      expect(response).to have_http_status(200)

      result = JSON.parse(response.body)
      expect(result.keys).to include('id', 'name', 'description', 'image_url', 'price')
    end
  end
end
