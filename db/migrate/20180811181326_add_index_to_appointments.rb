class AddIndexToAppointments < ActiveRecord::Migration[5.2]
  def change
    add_index :appointments, :time
  end
end
