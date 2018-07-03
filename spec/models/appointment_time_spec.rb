# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AppointmentTime, type: :model do
  context 'validations' do
    it { should validate_presence_of(:time) }
    it { should have_many(:appointments) }
    it { should have_many(:customers) }
  end
end
