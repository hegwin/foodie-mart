FactoryBot.define do
  factory :user do
    email { "MyString" }
    first_name { "MyString" }
    last_name { "MyString" }
    password_digest { "MyString" }
    recovery_password_digest { "MyString" }
  end
end
