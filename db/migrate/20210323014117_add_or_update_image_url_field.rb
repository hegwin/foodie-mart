class AddOrUpdateImageUrlField < ActiveRecord::Migration[6.1]
  def change
    add_column :restaurants, :image_url, :string, default: -> { "concat('https://picsum.photos/id/', floor(random() * 100)::int, '/300/300')" }
    rename_column :meals, :image, :image_url
  end
end
