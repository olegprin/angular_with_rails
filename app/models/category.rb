class Category < ActiveRecord::Base

   
  has_many :products
  validates :title, uniqueness: true
   
	def self.pluck_fields
    ["categories.id", "categories.title", "products.id", "products.title", "products.price", "products.avatar_url"]
  end

end
