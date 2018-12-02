class AddDayRefToAppointments < ActiveRecord::Migration[5.2]
  def change
    add_reference :appointments, :day, foreign_key: true
  end
end
