class V1::AppointmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    appointments = if current_user.is_admin
                     Appointment
                   else
                     Appointment.active(
                       current_user.id,
                       ActiveModel::Type::Boolean.new.cast(params[:active])
                     )
                   end

    render json: appointments
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
