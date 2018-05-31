# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user2 = User.new
user.username = 'Tim'
user.email = 'tim@gmail.com'
user.password = '123'
user.password_confirmation = '123'
user.save

