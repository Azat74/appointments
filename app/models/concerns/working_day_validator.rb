# TODO: Find more accurate way.
class WorkingDayValidator < ActiveModel::Validator
  def validate(record)
    record.errors.add(:date, 'invalid date') unless record.date.is_a? Time
  end
end
