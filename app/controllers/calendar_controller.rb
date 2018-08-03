class CalendarController < ApplicationController
  def index
    @days = Appointment
            .created_between(Date.today, Date.today + 2.months)
            .includes(:appointment_time)
            .order(:date, 'appointment_times.time')
            .group_by(&:date)
  end
end
