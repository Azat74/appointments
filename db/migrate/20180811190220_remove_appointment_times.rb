class RemoveAppointmentTimes < ActiveRecord::Migration[5.2]
  def change
    drop_table :appointment_times
  end
end
