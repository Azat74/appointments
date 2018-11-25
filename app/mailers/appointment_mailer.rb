class AppointmentMailer < ApplicationMailer
  def new_appointment
    @appointment = params[:appointment]
    mail(to: @appointment.user.email, subject: 'New appointment')
  end
end
