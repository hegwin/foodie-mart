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
end
