class UsersController < ApplicationController
  include Contr

  before_action :set_resource, only: [:ban, :unban, :show]
  before_action :set_title_and_description, only: [:show]

  def touch
    current_user.touch if current_user
    render json: {}
  end

  def rate
    if current_user.votes.include?(params[:id].to_i)
      return render json: {msg: "You did this"}, status: 422
    end

    current_user.votes.push(params[:id].to_i)
    current_user.save

    set_resource
    if params[:positive]
      @resource.increment!(:rating)
    else
      @resource.decrement!(:rating)
    end

    render json: {rating: @resource.rating}
  end

  def index
    @users = User.all
     respond_to do |format|
      format.html
      format.pdf do
        pdf = ReportPdf.new(@users)
        send_data pdf.render, filename: 'report.pdf', type: 'application/pdf'
      end
    end
  end  
  
  def metrics
    result = {}
    if current_user
      result[:posts_count] = current_user.posts_count
      result[:rating] = current_user.rating
    end
    render json: result
  end

  def ban
    authorize @resource
    @resource.update(banned: true)
    render json: {msg: "User was banned"}
  end

  def unban
    authorize @resource, :ban?
    @resource.update(banned: false)
    render json: {msg: "User was unbanned"}
  end

  private
    def set_model
      @model = User.order("rating DESC")
    end

    def set_title_and_description
      @title = @resource.name
      @description = "Rating: #{@resource.rating}, Posting: #{@resource.posts_count}"
    end
end
