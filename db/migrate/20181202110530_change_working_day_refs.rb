class ChangeWorkingDayRefs < ActiveRecord::Migration[5.2]
  def change
    remove_index :appointments, :day_id
    rename_column :appointments, :day_id, :working_day_id
    add_index :appointments, :working_day_id
    remove_foreign_key :appointments, :working_days
    add_foreign_key :appointments, :working_days
  end
end
