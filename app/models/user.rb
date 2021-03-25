class User < ApplicationRecord
  has_secure_password
  rolify

  attr_accessor :role_name

  has_many :blacklists, foreign_key: :restaurant_owner_id
  has_many :orders
  has_many :restaurants

  validates :email, presence: true, uniqueness: true
  validates :role_name, presence: true, inclusion: %w[regular restaurant_owner], on: :create

  before_create :assign_role

  private

  def assign_role
    self.add_role role_name.to_sym
  end
end
