class ChangeDayModelToWorkingDay < ActiveRecord::Migration[5.2]
  def change
    rename_table :days, :working_days
  end
end
