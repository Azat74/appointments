class CalendarController < ApplicationController
  def index
    @appointments = Appointment
                    .created_between(2018, 2020)
                    .includes(:appointment_time)
  end
end
