json.array! @restaurants do |restaurant|
  json.extract! restaurant, :id, :name, :description, :image_url, :longitude, :latitude
  json.extract! restaurant, :distance if restaurant.attributes.include?('distance')
end
