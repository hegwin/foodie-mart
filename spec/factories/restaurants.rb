FactoryBot.define do
  factory :restaurant do
    name        { Faker::Restaurant.name }
    description { Faker::Restaurant.type }
    online      { true }
    latitude    { Faker::Address.latitude }
    longitude   { Faker::Address.longitude }
  end
end
