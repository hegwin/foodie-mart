require 'rails_helper'

RSpec.describe 'Api::V1::Sessions', type: :request do
  describe 'POST /create' do
    let!(:user) { create :user, email: '1@1.com', password: 'P4$$word', password_confirmation: 'P4$$word' }

    it 'returns 201' do
      post '/api/v1/sessions', params: { email: user.email, password: 'P4$$word' }

      expect(response).to have_http_status(201)
    end

    it 'returns token and user' do
      post '/api/v1/sessions', params: { email: user.email, password: 'P4$$word' }

      result = JSON.parse(response.body)
      expect(result.keys).to include('token', 'user_id')
      expect(result['user_id']).to eq user.id
    end

    it 'returns unauthorized when password is incorrect' do
      post '/api/v1/sessions', params: { email: user.email, password: 'wrongword' }

      expect(response).to have_http_status(401)
    end

    it 'renders error when email is missing' do
      post '/api/v1/sessions', params: { password: 'password' }

      expect(response).to have_http_status(422)
    end

    it 'renders error when password is missing' do
      post '/api/v1/sessions', params: { email: '1@1.com' }

      expect(response).to have_http_status(422)
    end
  end
end
