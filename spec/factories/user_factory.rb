FactoryBot.define do
  factory :user do
    first_name { 'John' }
    last_name { 'Doe' }
    email { 'johndoe@example.com' }
    phone { 12_345_678_901 }
    is_admin { false }
    password { '12345678' }
  end
end
