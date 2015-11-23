class Api::Auth::SessionController < ApplicationController
  respond_to :json

  def index
    if cookies[:user]
      render json: cookies[:user]
    else
      render nothing: true, status: 401
    end
  end

  def create
    user = User.find_by credentials
    if user
      cookies[:user] = JSON.generate({ 
        name: user.name,
        email: user.email
      })
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

  def credentials
    params.permit(:email, :password)
  end
end
