require 'rails_helper'

RSpec.describe V1::WorkingDaysController, type: :request do
  before do
    user = create :user
    headers = {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json'
    }
    post user_session_path,
         params: { email: user.email, password: user.password }.to_json,
         headers: headers

    # TODO: Refcator with helper.
    @headers = {
      'access-token' => response.headers['access-token'],
      'token-type' => 'Bearer',
      'client' => response.headers['client'],
      'expiry' => response.headers['expiry'],
      'uid' => response.headers['uid']
    }
  end

  describe '#index' do
    context 'when user not authenticated' do
      it 'returns 401 Unauthorized' do
        get v1_working_days_path
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user authenticated' do
      context 'when working days doesnt exists' do
        it 'returns empty json' do
          get v1_working_days_path, headers: @headers
          expect(json_data).to be_empty
        end
      end

      context 'when working days exists' do
        it 'returns all working days' do
          working_days = create_list :working_day, 2
          get v1_working_days_path, headers: @headers
          working_days.each_with_index do |day, i|
            expect(json_data[i]['id']).to eq day.id.to_s
          end
        end

        it 'paginates result' do
          create_list :working_day, 5
          get v1_working_days_path,
              params: { page: 2, per_page: 3 },
              headers: @headers
          expect(json.length).to eq 2
        end
      end
    end
  end

  describe '#create' do
    let(:params) { { working_day: { date: Time.new } } }

    context 'when user not authenticated' do
      it 'returns 401 Unauthorized' do
        post v1_working_days_path, params: params
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user authenticated' do
      let(:auth_req) do
        post v1_working_days_path,
             params: params,
             headers: @headers
      end

      it 'creates new working day with valid params' do
        expect { auth_req }.to change { WorkingDay.count }.by(1)
      end

      it 'returns 422 with invalid params' do
        post v1_working_days_path,
             params: { working_day: { date: 'invalid param' } },
             headers: @headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe '#update' do
    let(:working_day) { create(:working_day, date: Time.new(2019, 5, 7)) }

    it 'updates exist working day' do
      working_day = create(:working_day, date: Time.new(2019, 5, 7))
      new_time = Time.new(2019, 5, 1)
      params = { working_day: { date: new_time } }
      put v1_working_day_path(working_day.id), params: params, headers: @headers
      expect(response).to have_http_status(:ok)
    end

    it 'returns 422 with invalid params' do
      put v1_working_day_path(working_day.id),
          params: { working_day: { date: 'invalid param' } },
          headers: @headers
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe '#delete' do
    it 'destroys working day' do
      working_day = create :working_day
      delete v1_working_day_path(working_day.id), headers: @headers
      expect(response).to have_http_status(:ok)
    end
  end
end
