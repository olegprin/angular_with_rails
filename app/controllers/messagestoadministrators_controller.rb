class MessagestoadministratorsController < ApplicationController
  include Contr
  before_action :authenticate_user!, only: [:index, :update, :destroy]
 

  private
    def set_model
      @model = Messagestoadministrator#.joins("LEFT JOIN products ON categories.id=products.category_id").order("categories.id")
      @model_redis="messagestoadministrators"
    end

    def redirect_options
      {
        create: {
          redirect_to_url: root_path
        },
        update: {
          redirect_to_url: root_path
        }
      }
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      params.require(:messagestoadministrator).permit(:name, :user_id, :telephone, :email, :message)
    end

end
