class SendAppointmentNotification
  include Interactor

  def call
    AppointmentMailer
      .with(appointment: context.appointment)
      .new_appointment
      .deliver_later
  end
end
