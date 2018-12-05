require 'rails_helper'

RSpec.describe 'Working days page', type: :system do
  let(:user) { create(:user, is_admin: true) }

  it 'allows user to create new day' do
    login_as(user)

    visit '/working_days'
    click_link 'Add day'
    fill_in 'Pick a day', with: '2018-12-05'
    click_button 'Create'

    expect(page).to have_text('5 Dec 18')
  end
end
