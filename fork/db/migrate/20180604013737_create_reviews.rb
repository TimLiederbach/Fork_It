class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :creator_email
      t.integer :res_id
      t.string :restaurant_name
      t.integer :overall_rating
      t.integer :price_rating
      t.integer :food_quality
      t.text :comments

      t.timestamps
    end
  end
end
