class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.date :date
      t.integer :customer_id
      t.integer :appointment_time_id

      t.timestamps
    end
  end
end
