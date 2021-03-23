class Restaurant < ApplicationRecord
  belongs_to :user
  has_many :meals
  has_many :orders

  validates :name, presence: true
  validates :description, presence: true

  scope :near, ->(lat, long) { select(sanitize_sql_array(['*, earth_distance(ll_to_earth(?, ?), ll_to_earth(latitude, longitude)) AS distance', lat, long])).order('distance') }
end
