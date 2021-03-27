# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
20.times do
  restaurant_owner = FactoryBot.create :user, :restaurant_owner, password: 'password', password_confirmation: 'password'
  restaurant = FactoryBot.create :restaurant, user: restaurant_owner

  rand(5..30).times do
    FactoryBot.create :meal, restaurant: restaurant
  end
end
