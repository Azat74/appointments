class TimeValidator < ActiveModel::Validator
  def validate(record)
    if record.date < Date.today
      record.errors[:date_error] << 'Appointment date must be valid'
    end
  end
end

class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :appointment_time
  validates :date, :user_id, :appointment_time_id, presence: true
  validates :appointment_time_id,
            uniqueness: { scope: :date, message: 'only once per day' }
  validates_with TimeValidator

  def to_s
    "#{date} #{user} #{appointment_time}"
  end

  def self.created_between(first, last)
    where('date BETWEEN ? AND ?', first, last)
  end

  def self.active(id)
    where('date >= ? AND user_id = ?', Date.today, id)
  end
end
