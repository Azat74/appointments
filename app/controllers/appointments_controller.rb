class AppointmentsController < ApplicationController
  def index
    @appointments =
      Appointment.all.order(:date)
  end

  def new
    @appointment = Appointment.new
    @times = AppointmentTime.all
  end

  def create
    @appointment = Appointment.new(apointment_params)
    @appointment.customer_id = 3
    @appointment.appointment_time_id =
      params[:appointment][:appointment_time_id]
    @appointment.save
    redirect_to root_path
  end

  private

  def apointment_params
    params.require(:appointment).permit(:date, :appointment_time_id)
  end
end
