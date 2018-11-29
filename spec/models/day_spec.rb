require 'rails_helper'

RSpec.describe Day, type: :model do
  context 'validations' do
    it { should validate_uniqueness_of(:date) }
    it { should have_many(:appointments) }
  end
end
