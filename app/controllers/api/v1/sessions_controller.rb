class Api::V1::SessionsController < Api::V1::BaseController
  rescue_from ActionController::ParameterMissing, with: :parameter_missing

  def create
    params.require(:email)
    params.require(:password)

    user = User.find_by(email: params[:email])&.authenticate(params[:password])

    if user
      token = AuthnService.call(user.to_h)

      render json: { token: token, user: user.to_h }, status: :created
    else
      render json: { error: 'Invalid email/password combination' }, status: :unprocessable_entity
    end
  end

  private

  def parameter_missing(e)
    render json: { error: e.message }, status: 422
  end
end
