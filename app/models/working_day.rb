class WorkingDay < ApplicationRecord
  has_many :appointments
  has_many :users, through: :appointments
  validates :date, uniqueness: true
  validates_with WorkingDayValidator, fields: :date

  scope :available, lambda {
    includes(:appointments, :users)
      .where('date >= ?', Date.today)
      .order(:date)
  }

  def to_s
    date.strftime('%e %b %y %a')
  end
end
