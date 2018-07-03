class AddPhoneIndexToCustomer < ActiveRecord::Migration[5.2]
  def change
    add_index :customers, :phone
  end
end
