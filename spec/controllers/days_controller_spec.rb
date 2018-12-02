require 'rails_helper'

RSpec.describe DaysController, type: :controller do
  describe 'GET index' do
    it 'renders the index template' do
      get :index
      expect(response).to have_http_status(200)
    end
  end
end