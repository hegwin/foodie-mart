class Meal < ApplicationRecord
  belongs_to :restaurant

  validates :name, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }

  def to_snapshot
    {
      name: name,
      description: description,
      price: price,
      image_url: image_url
    }
  end
end
