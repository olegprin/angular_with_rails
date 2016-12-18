class AddAvatarToProducts < ActiveRecord::Migration
  def change
    add_column :products, :avatar, :string, default: "/default_avatar.png"
  end
end
