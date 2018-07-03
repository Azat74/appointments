class AppointmentTime < ApplicationRecord
  has_many :appointments
  has_many :customers, through: :appointments
  validates :time, presence: true
end
