FactoryBot.define do
  factory :role do
    name { 'regular' }

    trait :restaurant_owner do
      name { 'restaurant_owner' }
    end
  end
end
