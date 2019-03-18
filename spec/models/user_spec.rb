require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    subject { create(:user) }
    it { is_expected.to validate_presence_of(:phone) }
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_presence_of(:last_name) }
    it { is_expected.to validate_uniqueness_of(:phone).case_insensitive }
  end

  context 'associations' do
    it { is_expected.to have_many(:appointments) }
    it { is_expected.to have_many(:working_days) }
  end
end
