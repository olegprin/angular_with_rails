class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title
      t.integer :user_id
      t.text :description
      #t.attachment :uploaded_file
      t.integer :avatar_id
      t.string :image

      t.float :latitude
      t.float :longitude
      t.string :adress
      
      t.boolean :type_sell,default: false
      t.string :avatar_url, default: "/default_avatar.png"
      t.integer :category_id
      t.decimal :price, precision: 8, scale: 2
      #t.text :full_description
      t.timestamps null: false
    end
  end
end
