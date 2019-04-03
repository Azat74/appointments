class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :time, :user_id, :working_day
end
