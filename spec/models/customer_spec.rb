# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Customer, type: :model do
  context 'with appointment' do
    it 'check appointment' do
      subject do
        Customer.new(
          first_name: 'Moe',
          last_name: 'Szyslak',
          phone: '16548924831'
        )
      end
      expect(subject.valid?).to be true
    end
  end
end
