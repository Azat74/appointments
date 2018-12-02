class AppointmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @appointments = Appointment.active(current_user.id)
  end

  def new
    @appointment = Appointment.new
    @days = WorkingDay.order(:date)
  end

  def create
    @appointment = Appointment.new(apointment_params)
    if @appointment.save
      AppointmentMailer
        .with(appointment: @appointment)
        .new_appointment
        .deliver_later
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def apointment_params
    params.require(:appointment).permit(:time, :working_day_id, :user_id)
  end
end
