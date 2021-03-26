FactoryBot.define do
  factory :blacklist do
    association :user
    association :restaurant_owner
  end
end
