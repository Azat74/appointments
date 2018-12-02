class WorkingDay < ApplicationRecord
  has_many :appointments
  has_many :users, through: :appointments
  validates :date, uniqueness: true

  # TODO: speak about testing simple scopes
  scope :available, -> { includes(:appointments, :users).order(:date) }

  def to_s
    date.strftime('%e %b %y %a')
  end
end
