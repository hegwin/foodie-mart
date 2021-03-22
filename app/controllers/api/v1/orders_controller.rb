class Api::V1::OrdersController < Api::V1::BaseController
  before_action :auth_jwt

  def index
    head 200
  end
end
