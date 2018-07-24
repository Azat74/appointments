class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :appointment_time
  validates :date, :user_id, :appointment_time_id, presence: true

  def self.created_between(first, last)
    where('extract(year from date) BETWEEN ? AND ?', first, last)
  end
end
