class Customer < ApplicationRecord
  has_many :appointments
  has_many :appointment_times, :through => :appointments
  validates :phone, :first_namem, :last_name, presence: true
  validates :phone, uniqueness: true
  validates :phone, format: { with: /\A\d{11}\z/, message: "The phone must contain a 10 digits." }
end
