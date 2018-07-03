class ChangeAppointmentTimeColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :appointment_times, :time
    add_column :appointment_times, :time, :datetime
  end
end
