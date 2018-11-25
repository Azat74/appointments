class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :day
  validates :time, presence: true
  validates :time, uniqueness: { scope: :day,
                                 message: 'only once per day' }

  def to_s
    "#{user} #{time.strftime('%H:%M')}"
  end

  def self.created_between(first, last)
    where('days.date BETWEEN ? AND ?', first, last)
  end

  def self.active(id)
    where('days.date >= ? AND user_id = ?', Date.today, id)
  end
end
