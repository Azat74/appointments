class AppointmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @appointments = Appointment
                    .where(user_id: current_user.id)
                    .includes(:appointment_time, :user)
                    .order(:date, 'appointment_times.time')
  end

  def new
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(apointment_params)
    @appointment.user_id = current_user.id
    @appointment.appointment_time_id =
      params.dig(:appointment, :appointment_time_id)
    if @appointment.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def apointment_params
    params.require(:appointment).permit(:date, :appointment_time_id)
  end
end
