require 'rails_helper'

RSpec.describe Appointment, type: :model do
  context 'validations' do
    it { should validate_presence_of(:time) }
  end

  context 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:working_day) }
  end

  let(:user) { create(:user) }
  let(:past_day) { create(:working_day, date: Time.new(2017, 1, 1)) }

  describe '.active' do
    it 'returns future appointments' do
      future_day = create(:working_day, date: Time.new(2022, 3, 5))
      create(
        :appointment,
        working_day_id: past_day.id,
        user_id: user.id
      )
      active_appointment = create(
        :appointment,
        working_day_id: future_day.id,
        user_id: user.id
      )

      expect(Appointment.active(user.id)).to eq([active_appointment])
    end
  end

  describe '.created_between' do
    it 'returns appointments between selected dates' do
      first_date = Time.new(2018, 1, 1)
      last_date = Time.new(2018, 3, 1)
      working_day = create(:working_day, date: Time.new(2018, 1, 12))
      create(
        :appointment,
        working_day_id: past_day.id,
        user_id: user.id
      )
      correct_appointment = create(
        :appointment,
        working_day_id: working_day.id,
        user_id: user.id
      )

      expect(Appointment.created_between(first_date, last_date))
        .to eq([correct_appointment])
    end
  end
end
