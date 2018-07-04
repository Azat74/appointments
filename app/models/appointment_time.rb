class AppointmentTime < ApplicationRecord
  has_many :appointments
  has_many :customers, through: :appointments
  validates :time, presence: true

  def time_to_string
    return self.time.strftime("%H:%M")
  end
end
