class WorkingDaySerializer < ActiveModel::Serializer
  attributes :id, :date

  has_many :appointments
  has_many :users
end
