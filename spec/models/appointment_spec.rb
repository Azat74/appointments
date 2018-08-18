# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Appointment, type: :model do
  context 'validations' do
    it { should validate_presence_of(:time) }
    it { should validate_presence_of(:user_id) }
    it { should belong_to(:user) }
    it { should belong_to(:day) }
  end
end
