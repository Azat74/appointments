class AppointmentMailer < ApplicationMailer
  def new_appointment
    @user = params[:user]
    @appointment = params[:appointment]
    mail(to: @user.email, subject: 'New appointment')
  end
end
