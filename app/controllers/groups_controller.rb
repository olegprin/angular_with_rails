class GroupsController < ApplicationController
  include Contr

  private
    def set_model
      @model = Group#.joins("LEFT JOIN themes ON themes.group_id = groups.id").order("groups.id")
      @model_redis="groups"
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

    def resource_params
      params.require(:group).permit(:title)
    end
end
