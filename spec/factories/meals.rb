FactoryBot.define do
  factory :meal do
    name { Faker::Food.dish }
    description { Faker::Food.description }
    price { Faker::Number.decimal(l_digits: 2, r_digits: 2) }

    association :restaurant
  end
end
