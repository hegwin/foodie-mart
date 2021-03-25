class Api::V1::UsersController < Api::V1::BaseController
  before_action :auth_jwt, except: :create

  def create
    user = User.new user_create_params

    if user.save
      token = AuthnService.generate_token(user.id)
      render json: { token: token }, status: :created
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  def update
    user = User.find(params[:id])

    authorize user

    if user.update user_update_params
      @current_user = user
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  def me; end

  private

  def user_create_params
    params.permit(:email, :first_name, :last_name, :password, :password_confirmation, :role_name)
  end

  def user_update_params
    params.permit(:first_name, :last_name, :password, :password_confirmation)
  end
end
