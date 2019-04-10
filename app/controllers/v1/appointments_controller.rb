class V1::AppointmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Appointment
      .active(current_user.id)
      .page(params[:page]).per(params[:per_page])
  end

  def create
    result = MakeAppointment.call(
      params: appointment_params
    )
    if result.success?
      render json: result.appointment, status: :ok
    else
      unprocessable_entity result.errors
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:time, :working_day_id, :user_id)
  end
end
