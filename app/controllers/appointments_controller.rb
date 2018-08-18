class AppointmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @appointments = Appointment
                    .active(current_user.id)
                    .includes(:day)
                    .order(:time, 'days.date')
  end

  def new
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(apointment_params)
    if @appointment.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def apointment_params
    params.require(:appointment).permit(:time, :day_id, :user_id)
  end
end
