#require "receipts/version"
#require "receipts/receipt"

class ProductsController < ApplicationController
  #include CurrentCart
  include Contr
  #before_action :only_admin_or_agent
  #before_action :set_cart
  #before_action :set_product, only: [:show, :edit, :update, :destroy]
 #before_action :ban_path, only: [:show]
  

  private
     
    def set_model
      @model = Product#.joins("LEFT JOIN categories ON categories.id=products.category_id").order("categories.id")
      @model_redis="products"
    end

    def redirect_options
      {
        create: {
          redirect_to_url: categories_path
        },
        update: {
          redirect_to_url: categories_path
        }
      }
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    #def resource_params
     # params.require(:product).permit(:user_id, :category, :title, :full_description,:description, :uploaded_file, :price)
    #end

    def resource_params
      params.require(:product).permit(:latitude, :longitude, :adress, :type_sell, :image, :category_id, :avatar_id, :avatar_url, :user_id, :title, :description, :price)
   end
end
