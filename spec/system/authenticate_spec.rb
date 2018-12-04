require 'rails_helper'

RSpec.describe 'Login page', type: :system do
  before do
    create(:user)
  end

  it 'authenticate user' do
    visit '/'
    fill_in 'Email', with: 'johndoe@example.com'
    fill_in 'Password', with: '12345678'
    click_button 'Log in'

    expect(page).to have_text('Appointments')
  end
end
