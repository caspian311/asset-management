class Api::SessionController < ApplicationController
  respond_to :json

  def create
    if user
      cookies[:user] = user_data user
      render nothing: true, status: 201
    else
      render nothing: true, status: 401 
    end
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
