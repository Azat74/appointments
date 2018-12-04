require 'rails_helper'

RSpec.describe 'Appointment page', type: :system do
  before do
    create(:working_day, date: Time.new(2018, 12, 05))
  end

  let(:user) { create(:user, is_admin: true) }

  it 'allows user to create new appointment' do
    login_as(user)

    visit '/appointment'
    find('.new-appointment').click
    fill_in 'Customer name', with: 'John'
    fill_in 'Select time', with: '09:30'
    # TODO: Fix name autocomplete plugin
    click_button 'Create'

    expect(page).to have_text('5 Dec 18')
  end
end
