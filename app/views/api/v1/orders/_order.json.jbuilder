json.extract! order, :id, :created_at, :updated_at, :status, :total, :shipping_info

json.user do
  json.extract! order.user, :id, :email, :first_name, :last_name
end

json.restaurant do
  json.extract! order.restaurant, :id, :name, :image_url
end

json.order_items order.order_items do |item|
  json.extract! item, :id, :meal_id, :meal_snapshot, :amount, :subtotal
end
