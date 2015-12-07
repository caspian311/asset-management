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

  def user_data_valid?
    User.create(user_data).valid? 
  end

  def user_by_credentials
    @user ||= User.find_by crendetials
  end

  def user_by_id
    @user ||= User.find_by id: params[:id]
  end

  def json_user
    user = User.find(user_id)
    json_user = JSON.parse(user.to_json)
    
    if user.phone_numbers.first
      json_user['primary_phone_number'] = user.phone_numbers.first.number
    end

    if user.phone_numbers.second
      json_user['secondary_phone_number'] = user.phone_numbers.second.number
    end

    if user.address
      json_user['address'] = user.address.address
      json_user['city'] = user.address.city
      json_user['state'] = user.address.state
      json_user['zip'] = user.address.zip
    end

    json_user
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
