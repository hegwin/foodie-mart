class CreateBlacklists < ActiveRecord::Migration[6.1]
  def change
    create_table :blacklists do |t|
      t.integer :restaurant_owner_id
      t.integer :user_id

      t.timestamps
    end
  end
end
