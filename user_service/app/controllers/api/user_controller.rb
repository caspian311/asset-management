class Api::UserController < ApplicationController
  respond_to :json

  def create
    status = 400
    status = 200 if User.create(user_data).valid? 
    render nothing: true, status: status
  end

  private

  def user_data
    params.permit :first_name, :last_name, :email, :password
  end
end
