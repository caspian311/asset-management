class Api::Auth::SessionController < ApplicationController
  respond_to :json

  def index
    if session[:user]
      render json: session[:user]
    else
      render nothing: true, status: 401
    end
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
    session[:user] = nil
    render nothing: true
  end

  private

  def credentials
    params.permit(:email, :password)
  end
end
