class Product < ActiveRecord::Base
  
  #include ObjectModel::Model
  
  belongs_to :user
  belongs_to :category
  belongs_to :avatar
  #@model_of_attachment='uploaded_file'.parameterize.underscore.to_sym	 
  #include ValidationsForPicture
  geocoded_by :adress
  validates :price, numericality: {greater_than_or_equal_to: 0.01}
  validates :title, :adress, uniqueness: true
  validates :description, presence: true, uniqueness: true

 

  def self.latest
	  Product.order(:updated_at).last
  end
  
  def self.pluck_fields
    ["products.id", "products.avatar_url", "products.title", "products.description", "products.price", "products.type_sell", "products.adress", "products.latitude", "products.longitude"]
  end

end
