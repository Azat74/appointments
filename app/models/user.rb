class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable # TODO: :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :appointments
  has_many :working_days, through: :appointments

  validates :phone, :first_name, :last_name, presence: true
  validates :phone, uniqueness: true
  validates :phone, format: {
    with: /\A\d{11}\z/,
    message: 'The phone must contain a 10 digits.'
  }, case_sensitive: false

  def to_s
    "#{first_name} #{last_name}"
  end
end
