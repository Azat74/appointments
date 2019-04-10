class V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user.is_admin
      render json: User.search(params[:q])
    else
      head :forbidden
    end
  end
end
