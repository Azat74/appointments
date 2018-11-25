# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  def create
    super
    # TODO Add mailer when user created.
    if resource.save
      UserMailer.with(user: resource).welcome_email.deliver_later
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: %i[first_name last_name phone email]
    )
  end
end
