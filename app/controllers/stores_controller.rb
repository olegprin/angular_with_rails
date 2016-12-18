class StoresController < ApplicationController
  
  include Contr
  respond_to :html, :json

  def all_category
    @products = Product.order(:title)
  end
  
   def index
      respond_to do |format|
        format.html
        format.json {
          if params[:filter]
            filter_params = params.require(:filter).permit(filter_fields)
            collection = @model.where(filter_params)
          else
            collection = @model
          end

          render json: Oj.dump({
            #total_count: collection.count,
            serializer: serializer,
            collection: collection.pluck(*pluck_fields)
        
          })
        }
      end
    end


  def contact
    @messagestoadministrator = Messagestoadministrator.new
  end 
   
   private
    

    def set_model
      @model = Product#.joins("LEFT JOIN categories ON categories.id=products.category_id").order("categories.id")
      #@model_redis="products"
    end
    
    # Never trust parameters from the scary internet, only allow the white list through.
    #def resource_params
     # params.require(:product).permit(:user_id, :category, :title, :full_description,:description, :uploaded_file, :price)
    #end
 
end
