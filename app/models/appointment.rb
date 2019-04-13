class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :working_day
  validates :time, presence: true
  validates :time, uniqueness: { scope: :working_day,
                                 message: 'only once per day' }

  def to_s
    "#{user} #{time.strftime('%H:%M')}"
  end

  def self.created_between(first, last)
    includes(:working_day)
      .where('working_days.date BETWEEN ? AND ?', first, last)
      .order(:time, 'working_days.date')
  end

  def self.active(id, only_active = true)
    appointments = includes(:working_day)
    if only_active
      appointments = appointments
                     .where('working_days.date >= ? AND user_id = ?',
                            Date.today, id)
    end

    appointments.order(:time, 'working_days.date')
  end

  def self.of_user(id)
    includes(:working_day)
      .where(user_id: id)
      .order(:time, 'working_days.date')
  end
end
