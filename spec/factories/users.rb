FactoryBot.define do
  factory :user do
    email      { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    role_name  { 'regular' }

    password   { 'password' }
    password_confirmation { 'password' }

    trait :restaurant_owner do
      role_name { 'restaurant_owner' }
    end
  end
end
