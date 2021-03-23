require 'rails_helper'

RSpec.describe 'Api::V1::Orders', type: :request do
  let!(:user) { create :user }
  let(:token) { AuthnService.generate_token(user.id) }

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
end
