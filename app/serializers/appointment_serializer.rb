class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :time, :user_id

  belongs_to :working_day
  belongs_to :user
end
