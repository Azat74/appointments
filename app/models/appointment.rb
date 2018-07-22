class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :appointment_time
  validates :date, :user_id, :appointment_time_id, presence: true
end
