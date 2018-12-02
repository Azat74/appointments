class AddPhoneIndexToUser < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :phone
  end
end
