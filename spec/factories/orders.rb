FactoryBot.define do
  factory :order do
    status  { 'placed' }
    total   { '9.99' }
    shipping_info do
      {
        line1: Faker::Address.street_address,
        line2: '',
        zip_code: Faker::Address.zip_code,
        phone: Faker::PhoneNumber.cell_phone
      }
    end

    association :restaurant
    association :user

    order_items { [association(:order_item)] }
  end
end
