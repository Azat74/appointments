class Customer < ApplicationRecord
    has_many :appointmets
    has_many :appointmet_times, :through => :appointments
end
