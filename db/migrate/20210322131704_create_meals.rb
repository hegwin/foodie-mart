class CreateMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :meals do |t|
      t.string :name
      t.text :description
      t.decimal :price, precision: 8, scale: 2
      t.string :image, default: 'https://picsum.photos/id/312/200/200'
      t.boolean :online, default: true
      t.integer :restaurant_id

      t.timestamps
    end

    add_index :meals, :name
    add_index :meals, :restaurant_id
    add_index :meals, %i[name restaurant_id]
  end
end
