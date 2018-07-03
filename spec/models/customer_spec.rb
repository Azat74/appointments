# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Customer, type: :model do
  context 'validations' do
    it { should validate_presence_of(:phone) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_uniqueness_of(:phone) }
    it { should have_many(:appointments) }
    it { should have_many(:appointment_times) }
  end
end
