require 'rails_helper'

RSpec.describe WorkingDay, type: :model do
  context 'validations' do
    it { is_expected.to validate_uniqueness_of(:date) }
  end

  context 'associations' do
    it { is_expected.to have_many(:appointments) }
    it { is_expected.to have_many(:users) }
  end
end
