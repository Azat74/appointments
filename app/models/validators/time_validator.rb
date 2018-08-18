class TimeValidator < ActiveModel::Validator
  def validate(record)
    if record.date < Date.today
      record.errors[:date_error] << 'Appointment date must be valid'
    end
  end
end
