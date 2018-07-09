class AppointmentsController < ApplicationController
  before_action :authenticate_customer!

  def index
    @appointments = Appointment
                    .where(customer_id: current_customer.id)
                    .includes(:appointment_time, :customer)
                    .order(:date, 'appointment_times.time')
  end

  def new
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(apointment_params)
    @appointment.customer_id = current_customer.id
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
