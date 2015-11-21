class Api::Auth::SessionController < ApplicationController
  respond_to :json

  def index
    render json: session[:user]
  end

  def create
    user = User.find_by credentials
    if user
      session[:user] = { 
        name: user.name,
        email: user.email
      }
      render json: session[:user], status: 201
    else
      render nothing: true, status: 401
    end
  end

  def destroy
    render json: {}
  end

  private

  def credentials
    params.permit(:email, :password)
  end
end
