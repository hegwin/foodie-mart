class Api::V1::SessionsController < Api::V1::BaseController
  rescue_from ActionController::ParameterMissing, with: :parameter_missing

  def create
    user = User.find_by(email: params.require(:email))&.authenticate(params.require(:password))

    if user
      token = AuthnService.generate_token(user.id)

      render json: { token: token, user_id: user.id }, status: :created
    else
      head :unauthorized
    end
  end

  private

  def parameter_missing(e)
    render json: { error: e.message }, status: 422
  end
end
