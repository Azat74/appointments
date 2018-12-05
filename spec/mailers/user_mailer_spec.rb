require 'rails_helper'

RSpec.describe UserMailer, type: :mailer do
  before do
    @user = create(:user)
  end

  let(:mail) do
    UserMailer
      .with(user: @user)
      .welcome_email
      .deliver_now
  end

  it 'renders correct headers' do
    expect(mail.from).to eq(['from@example.com'])
    expect(mail.to).to eq([@user.email])
    expect(mail.subject).to eq('Welcome to My Awesome Site')
  end

  it 'renders correct body' do
    # TODO: speak about interpolation in templates
    template = file_fixture('new_user_mail.txt').read
    template.gsub!('{name}', @user.first_name)
    template.gsub!('{email}', @user.email)
    expect(mail.body.to_s).to match(template)
  end
end
