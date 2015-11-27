class Api::SessionController < ApplicationController
  respond_to :json

  def index
    if cookies[:user]
      render json: cookies[:user]
    else
      render nothing: true, status: 401
    end
  end

  def create
    if user
      cookies[:user] = user_data user
      render json: cookies[:user], status: 201
    else
      render nothing: true, status: 401 
    end
  end

  def destroy
    cookies.delete :user
    render nothing: true
  end

  private
  
  def user
    @user ||= User.find_by credentials
  end

  def user_data(user)
    JSON.generate({ 
        name: "#{user['first_name']} #{user['last_name']}",
        email: user['email']
      })
  end

  def credentials
    params.permit(:email, :password)
  end
end
