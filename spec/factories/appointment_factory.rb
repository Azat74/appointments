FactoryBot.define do
  factory :appointment do
    time { Time.now }
    working_day_id { 1 }
    user_id { 1 }
  end
end
