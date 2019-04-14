require 'elasticsearch/model'

class User < ApplicationRecord
  include Elasticsearch::Model

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # TODO: :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :appointments
  has_many :working_days, through: :appointments

  validates :phone, :first_name, :last_name, :email, presence: true
  validates :phone, uniqueness: true
  validates :phone, format: {
    with: /\A\d{11}\z/,
    message: 'The phone must contain a 10 digits.'
  }, case_sensitive: false

  def to_s
    "#{first_name} #{last_name}"
  end

  def self.search(query_string)
    __elasticsearch__.search(
      query: {
        query_string: {
          query: "#{query_string}*",
          fields: %i[last_name first_name]
        }
      },
      _source: %i[id first_name last_name email]
    ).results
  end
end
