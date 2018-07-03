# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Appointment, type: :model do
  context 'validations' do
    it { should validate_presence_of(:date) }
    it { should validate_presence_of(:customer_id) }
    it { should validate_presence_of(:appointment_time_id) }
    it { should belong_to(:customer) }
    it { should belong_to(:appointment_time) }
  end
end
