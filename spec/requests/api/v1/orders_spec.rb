require 'rails_helper'

RSpec.describe 'Api::V1::Orders', type: :request do
  let!(:user) { create :user }
  let(:token) { AuthnService.generate_token(user.id) }
  let(:headers_for_user) {{ Authorization: "Bearer #{token}" }}

  let(:restaurant_owner) { create :user, :restaurant_owner }
  let(:token_for_restaurant_owner) { AuthnService.generate_token(restaurant_owner.id) }
  let(:headers_for_owner) {{ Authorization: "Bearer #{token_for_restaurant_owner}" }}

  describe '#auth_jwt' do
    it 'requires current user' do
      get '/api/v1/orders', headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
    end

    it 'renders 401 if token is invalid' do
      get '/api/v1/orders', headers: { Authorization: "Bearer InvalidToken" }
      expect(response).to have_http_status(401)
    end

    it 'rederns 401 if user is not found via decoded jwt' do
      invalid_token = AuthnService.generate_token User.maximum(:id).next

      get '/api/v1/orders', headers: { Authorization: "Bearer #{invalid_token}" }
      expect(response).to have_http_status(401)
    end
  end

  describe '#authorize' do
    let(:other_user) { create :user }
    let(:other_user_order) { create :order, user: other_user }
    let(:other_user_token) { AuthnService.generate_token(other_user.id) }

    it 'denies unauthorized user' do
      get "/api/v1/orders/#{other_user_order.id}", headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(403)
    end

    it 'permits authorized user' do
      get "/api/v1/orders/#{other_user_order.id}", headers: { Authorization: "Bearer #{other_user_token}" }
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/v1/index' do
    context 'as a regular user' do
      let!(:my_orders) { create_list :order, 2, user: user }
      let(:other_user) { create :user }
      let!(:other_user_orders) { create :order, user: other_user }

      it 'only lists my orders' do
        get '/api/v1/orders', headers: headers_for_user
        expect(response).to have_http_status(200)

        expect(json.count).to eq(2)
        expect(json.pluck('id')).to match_array my_orders.pluck(:id)
      end
    end

    context 'as a restaurant order' do
      let!(:my_restaurant) { create :restaurant, user: restaurant_owner }
      let!(:other_restaurant) { create :restaurant }
      let!(:my_orders) { create_list :order, 3, restaurant: my_restaurant }
      let!(:other_orders) { create_list :order, 2, restaurant: other_restaurant }

      it 'only lists orders belong to my restaurant' do
        get "/api/v1/orders?restaurant_id=#{my_restaurant.id}", headers: headers_for_owner
        expect(response).to have_http_status(200)
        expect(json.count).to eq(3)
      end

      it 'denies when I try to see orders belong to another restaurant' do
        get "/api/v1/orders?restaurant_id=#{other_restaurant.id}", headers: headers_for_owner
        expect(response).to have_http_status(403)
      end
    end
  end

  describe 'POST /api/v1/orders' do
    let(:restaurant) { create :restaurant }
    let(:meal) { create :meal, restaurant: restaurant }
    let(:valid_params) do
      {
        restaurant_id: restaurant.id,
        shipping_info: {
          line1: 'Barton Street 81E12B',
          phone: '+1 12323223'
        },
        order_items_attributes: [
          {
            meal_id: meal.id,
            amount: 2
          }
        ]
      }
    end
    let(:invalid_params) do
      {
        restaurant_id: restaurant.id,
        shipping_info: {},
        order_items_attributes: [
          {
            meal_id: meal.id,
            amount: -1
          }
        ]
      }
    end

    it 'creates an order' do
      expect { post '/api/v1/orders', params: valid_params, headers: headers_for_user }.to change { user.orders.count }.by(1)
    end

    it 'returns the new order' do
      post '/api/v1/orders', params: valid_params, headers: headers_for_user

      expect(response).to have_http_status(201)
      expect(json.keys).to include('id', 'status', 'order_items', 'status_histories')
    end

    it 'returns 422 when params invalid' do
      post '/api/v1/orders', params: invalid_params, headers: headers_for_user

      expect(response).to have_http_status(422)
    end
  end

  describe 'GET /api/v1/orders/:id' do
    let!(:restaurant) { create :restaurant, user: restaurant_owner }
    let!(:order) { create :order, user: user, restaurant: restaurant }

    context 'as a regular user' do
      it 'shows my order' do
        get "/api/v1/orders/#{order.id}", headers: headers_for_user

        expect(response).to have_http_status(200)
        expect(json.keys).to include('id', 'status', 'total', 'restaurant', 'order_items')
      end
    end

    context 'as a restaurant owner' do
      it 'shows my order' do
        get "/api/v1/orders/#{order.id}", headers: headers_for_owner

        expect(response).to have_http_status(200)
        expect(json.keys).to include('id', 'status', 'total', 'user', 'shipping_info', 'order_items')
      end
    end
  end
end
