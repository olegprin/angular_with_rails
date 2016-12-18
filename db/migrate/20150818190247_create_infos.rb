class CreateInfos < ActiveRecord::Migration
  def change
    create_table :infos do |t|
      t.string :name
      t.string :city
      t.references :user, index: true, foreign_key: true
      t.string :telephone
      t.string :data
      t.string :bio
      t.integer :avatar_id
      t.string :avatar_url, default: "/default_avatar.png"
      t.boolean :send_new_film, default: false
      t.boolean  :send_comments_to_film, default: false
      t.boolean  :ban, default: :false
      t.attachment :photo
      t.timestamps null: false
    end
  end
end
