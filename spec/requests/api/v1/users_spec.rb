require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  describe 'POST /api/v1/users' do
    let(:valid_params) do
      {
        email: 'mail@example.com',
        first_name: 'Jane',
        last_name: 'Doe',
        password: 'password',
        password_confirmation: 'password',
        role_name: 'regular'
      }
    end
    let(:valid_params_for_restaurant_owner) do
      {
        email: 'sales@jeo.com',
        password: 'password',
        password_confirmation: 'password',
        role_name: 'restaurant_owner'
      }
    end
    let(:invalid_params) do
      {
        email: '',
        password: 'password',
        password_confirmation: 'password',
        role_name: 'regular'
      }
    end

    it 'creates a user' do
      expect { post '/api/v1/users', params: valid_params }.to \
        change { User.count }.by(1)
    end

    it 'returns a JWT token for the new user' do
      post '/api/v1/users', params: valid_params
      expect(response).to have_http_status(201)

      result = JSON.parse(response.body)
      expect(result.keys).to eq ['token']
    end

    it 'assigns proper attributes' do
      post '/api/v1/users', params: valid_params

      user = User.last
      expect(user.first_name).to eq valid_params[:first_name]
      expect(user.email).to eq valid_params[:email]
      expect(user.is_regular?).to be_truthy
    end

    it 'creates a restaurant owner' do
      post '/api/v1/users', params: valid_params_for_restaurant_owner

      user = User.last
      expect(user.is_restaurant_owner?).to be_truthy
    end

    it 'returns 422 for invalid params' do
      post '/api/v1/users', params: invalid_params

      expect(response).to have_http_status(422)
    end
  end

  describe 'PATCH /api/v1/users/:id' do
    let!(:user) { create :user }
    let(:token) { AuthnService.generate_token(user.id) }
    let(:headers_for_user) {{ Authorization: "Bearer #{token}"}}
    let(:params) {{ first_name: 'New' }}

    it 'updates user info' do
      patch "/api/v1/users/#{user.id}", params: params, headers: headers_for_user

      expect(response).to have_http_status(200)
      expect(user.reload.first_name).to eq('New')
    end

    it 'does not allow me to change my email' do
      expect { patch "/api/v1/users/#{user.id}", params: { email: 'new@mail.com' }, headers: headers_for_user }.not_to \
        change { user.reload.email }
    end
  end

  describe 'GET /api/v1/users/me' do
    let!(:user) { create :user, first_name: 'Hegwin', last_name: 'Xiao' }
    let(:token) { AuthnService.generate_token(user.id) }
    let(:headers_for_user) {{ Authorization: "Bearer #{token}"}}

    it 'returns my info' do
      get '/api/v1/users/me', headers: headers_for_user
      expect(response).to have_http_status(200)

      result = JSON.parse(response.body)
      expect(result['first_name']).to eq 'Hegwin'
    end
  end
end
