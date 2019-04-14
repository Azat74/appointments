class WorkingDaySerializer < ActiveModel::Serializer
  attributes :id, :date, :appointments
end
