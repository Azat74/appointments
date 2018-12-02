class AddIndexToAppointmentsUserId < ActiveRecord::Migration[5.2]
  def change
    add_index :appointments, :user_id
  end
end
