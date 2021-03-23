class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.integer :order_id
      t.integer :meal_id
      t.jsonb :meal_snapshoot
      t.integer :amount
      t.decimal :subtotal, precision: 8, scale: 2

      t.timestamps
    end
  end
end
