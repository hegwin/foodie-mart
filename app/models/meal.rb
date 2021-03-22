class Meal < ApplicationRecord
  belongs_to :restaurant

  def to_screenshot
    {
      name: name,
      description: description,
      price: price,
      image: image
    }
  end
end
