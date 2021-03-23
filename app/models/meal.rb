class Meal < ApplicationRecord
  belongs_to :restaurant

  def to_snapshot
    {
      name: name,
      description: description,
      price: price,
      image_url: image_url
    }
  end
end
