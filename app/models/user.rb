class User < ApplicationRecord
  has_secure_password
  rolify

  has_many :blacklists, foreign_key: :restaurant_owner_id
  has_many :orders
  has_many :restaurants

  validates :email, presence: true
end
