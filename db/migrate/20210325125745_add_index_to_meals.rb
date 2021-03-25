class AddIndexToMeals < ActiveRecord::Migration[6.1]
  def change
    add_index :meals, %i[restaurant_id name]
  end
end
