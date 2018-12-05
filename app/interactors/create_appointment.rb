class CreateAppointment
  include Interactor

  def call
    appointment = Appointment.new(context.params)
    if appointment.save
      context.appointment = appointment
    else
      context.fail!
    end
  end
end
