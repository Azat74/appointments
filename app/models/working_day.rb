class WorkingDay < ApplicationRecord
  has_many :appointments
  validates :date, uniqueness: true

  def to_s
    date.strftime('%e %b %y %a')
  end
end
