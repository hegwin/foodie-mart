class Api::V1::BaseController < ActionController::API
  include ActionController::HttpAuthentication::Token
  include Pundit

  attr_reader :current_user

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  # Headers['Authorization'] = "Bearer #{Token}"
  def auth_jwt
    token, = token_and_options(request)
    user_id = AuthnService.decode(token)
    @current_user = User.find(user_id)
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
    head :unauthorized
  end

  def user_not_authorized
    head :forbidden
  end
end
