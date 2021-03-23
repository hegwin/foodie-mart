class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :restaurant_id
      t.integer :user_id
      t.string :status
      t.decimal :total, precision: 8, scale: 2
      t.jsonb :shipping_info

      t.timestamps
    end
  end
end
