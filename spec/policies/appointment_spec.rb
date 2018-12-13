require 'rails_helper'

RSpec.describe AppointmentPolicy do
  subject { described_class }
  let(:admin) { build(:user, is_admin: true) }
  let(:user) { build(:user, is_admin: false) }

  permissions :create?, :new? do
    it 'grants access if user is admin' do
      expect(subject).to permit(admin, Appointment)
    end

    it 'denies access if user not admin' do
      expect(subject).not_to permit(user, Appointment)
    end
  end
end
