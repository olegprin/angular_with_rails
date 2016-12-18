class Store < ActiveRecord::Base
   
	def self.pluck_fields
    ["products.id", "products.avatar_url", "products.title", "products.description", "products.price", "products.type_sell", "products.adress", "products.latitude", "products.longitude"]
  end

end
