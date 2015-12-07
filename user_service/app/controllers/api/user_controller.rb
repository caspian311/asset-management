class Api::UserController < ApplicationController
  respond_to :json

  def index
    if user_by_credentials
      render json: user_by_credentials, status: 200
    else
      render nothing: true, status: 404
    end
  end

  def show
    if user_by_id
      render json: json_user, status: 200
    else
      render nothing: true, status: 404
    end
  end

  def create
    render nothing: true, status: user_data_valid? ? 200 : 400
  end

  def update
    if user_by_id
      render nothing: true, status: 201
    else
      render nothing: true, status: 404
    end
  end

  private

  def json_user
    JsonUserHandler.new.json_user(@user)
  end

  def user_data_valid?
    User.create(user_data).valid? 
  end

  def user_by_credentials
    @user ||= User.find_by crendetials
  end

  def user_by_id
    @user ||= User.find_by id: params[:id]
  end

  def user_id
    params[:id].to_i
  end

  def crendetials
    params.permit :email, :password
  end

  def user_data
    params.permit :first_name, :last_name, :email, :password
  end
end
