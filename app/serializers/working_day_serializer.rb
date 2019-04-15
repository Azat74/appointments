class WorkingDaySerializer < ActiveModel::Serializer
  attributes :id, :date

  has_many :appointments
end
