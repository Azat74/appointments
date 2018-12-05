require 'rails_helper'

RSpec.describe MakeAppointment do
  it '.call should create appointment' do
    user = create(:user)
    working_day = create(:working_day)
    params = {
      user_id: user.id,
      working_day_id: working_day.id,
      time: Time.now
    }

    interactor = MakeAppointment.call(params: params)
    expect(interactor).to be_a_success
    expect(interactor.appointment).to eq(Appointment.last)
  end
end
