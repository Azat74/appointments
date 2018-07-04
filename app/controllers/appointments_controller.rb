class AppointmentsController < ApplicationController
  def index
    @appointments =
      Appointment
        .includes(:appointment_time, :customer)
        .order(:date, "appointment_times.time")
  end

  def new
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(apointment_params)
    @appointment.customer_id = 3
    @appointment.appointment_time_id =
      params.dig(:appointment, :appointment_time_id)
    @appointment.save
    redirect_to root_path
  end

  private

  def apointment_params
    params.require(:appointment).permit(:date, :appointment_time_id)
  end
end
