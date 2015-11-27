class Api::UserController < ApplicationController
  respond_to :json

  def index
    user = User.find_by crendetials
    if user
      render json: user, status: 200
    else
      render nothing: true, status: 404
    end
  end

  def create
    status = 400
    status = 200 if User.create(user_data).valid? 
    render nothing: true, status: status
  end

  private
  def crendetials
    params.permit :email, :password
  end

  def user_data
    params.permit :first_name, :last_name, :email, :password
  end
end
