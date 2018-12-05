require 'rails_helper'

RSpec.describe AppointmentMailer, type: :mailer do
  before do
    @user = create(:user)
    @working_day = create(:working_day)
    @appointment = create(
      :appointment,
      user_id: @user.id,
      working_day_id: @working_day.id
    )
  end

  let(:mail) do
    AppointmentMailer
      .with(appointment: @appointment)
      .new_appointment
      .deliver_now
  end

  it 'renders correct headers' do
    expect(mail.from).to eq(['from@example.com'])
    expect(mail.to).to eq([@user.email])
    expect(mail.subject).to eq('New appointment')
  end

  it 'renders correct body' do
    # TODO: speak about interpolation in templates
    template = file_fixture('appointment_mail.txt').read
    template.gsub!('{date}', @appointment.working_day.to_s)
    template.gsub!('{time}', @appointment.time.strftime('%H:%M'))
    expect(mail.body.to_s).to match(template)
  end
end
