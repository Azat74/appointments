class CreateAppointment
  include Interactor

  def call
    appointment = Appointment.new(context.params)
    if appointment.save
      context.appointment = appointment
    else
      context.errors = appointment.errors
      context.fail!
    end
  end
end
