



class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :manga_id, null: false
      t.integer :rating, null: false
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
