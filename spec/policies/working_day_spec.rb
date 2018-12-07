require 'rails_helper'

RSpec.describe WorkingDayPolicy do
  subject { described_class }
  let(:admin) { build(:user, is_admin: true) }
  let(:user) { build(:user, is_admin: false) }

  permissions :create?, :new?, :update?, :edit? do
    it 'grants access if user is admin' do
      expect(subject).to permit(admin, WorkingDay)
    end

    it 'denies access if user not admin' do
      expect(subject).not_to permit(user, WorkingDay)
    end
  end
end
