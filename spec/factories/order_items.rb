FactoryBot.define do
  factory :order_item do
    meal_snapshot { "" }
    amount { 1 }
    subtotal { '9.99' }

    association :order
    association :meal
  end
end
