class Blacklist < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant_owner, class_name: 'User', foreign_key: :restaurant_owner_id
end
