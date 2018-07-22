class AppointmentTime < ApplicationRecord
  has_many :appointments
  has_many :user, through: :appointments
  validates :time, presence: true

  def to_s
    time_to_string
  end

  private

  def time_to_string
    time.strftime('%H:%M')
  end
end
