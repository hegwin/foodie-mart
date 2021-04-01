require 'rails_helper'

RSpec.describe 'Api::V1::Blacklists', type: :request do
  let(:restaurant_owner) { create :user, :restaurant_owner }
  let(:token) { AuthnService.generate_token(restaurant_owner.id) }
  let(:headers_for_owner) { { Authorization: "Bearer #{token}" } }

  describe 'GET /api/v1/blacklists' do
    before do
      create_list :blacklist, 2, restaurant_owner: restaurant_owner
      create_list :blacklist, 2, restaurant_owner: create(:user, :restaurant_owner)
    end

    it 'returns http success' do
      get '/api/v1/blacklists', headers: headers_for_owner
      expect(response).to have_http_status(:success)
      expect(json.length).to eq 2
    end
  end

  describe 'POST /api/v1/blacklists' do
    let(:user) { create :user }

    it 'returns created' do
      post '/api/v1/blacklists', params: { user_id: user.id }, headers: headers_for_owner
      expect(response).to have_http_status(201)
    end

    it 'create a blacklist' do
      expect { post '/api/v1/blacklists', params: { user_id: user.id }, headers: headers_for_owner }.to \
        change { restaurant_owner.blacklists.count }.by(1)
    end
  end

  describe 'DELETE /api/v1/blacklists' do
    let!(:blacklist) { create :blacklist, restaurant_owner: restaurant_owner }

    it 'returns success with no content' do
      delete "/api/v1/blacklists", params: { user_id: blacklist.user_id }, headers: headers_for_owner
      expect(response).to have_http_status(204)
    end

    it 'removes a blacklist' do
      expect { delete "/api/v1/blacklists?user_id=#{blacklist.user_id}", headers: headers_for_owner }.to \
        change { restaurant_owner.blacklists.count }.by(-1)
    end
  end
end
