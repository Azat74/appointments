class Appointment < ApplicationRecord
  belongs_to :customer
  belongs_to :appointment_time
  validates :date, :customer_id, :appointment_time_id, presence: true
end
