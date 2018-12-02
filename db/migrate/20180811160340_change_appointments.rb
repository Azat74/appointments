class ChangeAppointments < ActiveRecord::Migration[5.2]
  def change
    remove_column :appointments, :date, :date
    add_column :appointments, :time, :time
  end
end
