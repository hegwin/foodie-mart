class Api::V1::BlacklistsController < Api::V1::BaseController
  before_action :auth_jwt

  def index
    @blacklists = current_user.blacklists.includes(:user)
  end

  def create
    @blacklist = current_user.blacklists.find_or_create_by blacklist_params

    head :created
  end

  def destroy
    blacklist = current_user.blacklists.find_by(blacklist_params)

    blacklist.destroy

    head :no_content
  end

  private

  def blacklist_params
    params.permit(:user_id)
  end
end
