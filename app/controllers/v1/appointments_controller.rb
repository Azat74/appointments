class V1::AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.all
    authorize @appointments
    render json: @appointments
  end

  def new
    @appointment = Appointment.new
    @days = WorkingDay.order(:date)
  end

  def create
    result = MakeAppointment.call(
      params: appointment_params
    )
    if result.success?
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:time, :working_day_id, :user_id)
  end
end
