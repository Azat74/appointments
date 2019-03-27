class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def unprocessable_entity(error)
    render json: error, status: :unprocessable_entity
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: %i[first_name last_name phone is_admin image nickname]
    )
  end
end
