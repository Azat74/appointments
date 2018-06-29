class ChangeAppointmentTimeColumn < ActiveRecord::Migration[5.2]
  def change
    change_column :appointment_times, :time, :datetime
  end
end
