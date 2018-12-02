require 'rails_helper'

RSpec.describe WorkingDay, type: :model do
  context 'validations' do
    it { should validate_uniqueness_of(:date) }
  end

  context 'associations' do
    it { should have_many(:appointments) }
    it { should have_many(:users) }
  end
end
