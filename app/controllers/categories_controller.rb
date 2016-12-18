class CategoriesController < ApplicationController
  
  include Contr
  before_action :authenticate_user!
  #before_action :only_admin_or_agent

  private
    

    def set_model
      @model = Category.joins("LEFT JOIN products ON categories.id=products.category_id").order("categories.id")
      #@model_redis="categories"
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
    
    def define_eccept
      if can_manage_has_one(current_user.info, @resource, Info)
        return true
      else
        redirect_to root_path 
      end
    end

    def resource_params
      params.require(:category).permit(:title)
    end
end