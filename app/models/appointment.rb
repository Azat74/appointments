class Appointment < ApplicationRecord
    belongs_to :customer
    belongs_to :appointment_time
end
