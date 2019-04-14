class V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    head :forbidden unless current_user.is_admin

    if params[:q]
      render json: User.search(params[:q])
    else
      render json: User.page(params[:page]).per(params[:per_page])
    end
  end
end
