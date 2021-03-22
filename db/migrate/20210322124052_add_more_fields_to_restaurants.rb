class AddMoreFieldsToRestaurants < ActiveRecord::Migration[6.1]
  def change
    enable_extension 'cube'
    enable_extension 'earthdistance'

    add_column :restaurants, :online, :boolean, default: true
    add_column :restaurants, :latitude, :float8, default: 31.229818664563933
    add_column :restaurants, :longitude, :float8, default: 121.4567612447622
    add_column :restaurants, :user_id, :integer

    add_index :restaurants, :user_id
    add_index :restaurants, :online
    add_index :restaurants, 'll_to_earth(latitude, longitude)', name: :index_restaurants_on_coord
  end
end
