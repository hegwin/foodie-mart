FactoryBot.define do
  factory :restaurant do
    name        { Faker::Restaurant.name }
    description { Faker::Restaurant.type }
  end
end
