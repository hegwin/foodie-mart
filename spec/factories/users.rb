FactoryBot.define do
  factory :user do
    email      { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }

    password   { 'password' }
    password_confirmation { 'password' }

    after(:create) { |user| user.add_role :regular }

    trait :restaurant_owner do
      after(:create) { |user| user.add_role :restaurant_owner }
    end
  end
end
