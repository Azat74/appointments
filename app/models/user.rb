class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :appointments
  has_many :appointment_times, through: :appointments
  validates :phone, :first_name, :last_name, presence: true
  validates :phone, uniqueness: true
  validates :phone, format: {
    with: /\A\d{11}\z/,
    message: 'The phone must contain a 10 digits.'
  }
end
