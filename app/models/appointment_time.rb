class AppointmentTime < ApplicationRecord
  has_many :appointments
  has_many :user, through: :appointments
  validates :time, presence: true

  def to_s
    time_to_string
  end

  def time_to_string
    return self.time.strftime("%H:%M")
  end
end
