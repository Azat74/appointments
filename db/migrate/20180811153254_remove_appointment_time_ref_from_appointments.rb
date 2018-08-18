class RemoveAppointmentTimeRefFromAppointments < ActiveRecord::Migration[5.2]
  def change
    remove_reference :appointments, :appointment_time
  end
end
