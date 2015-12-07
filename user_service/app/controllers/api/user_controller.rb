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

  def show
    render json: user, status: 200
  end

  def create
    status = 400
    status = 200 if User.create(user_data).valid? 
    render nothing: true, status: status
  end

  private
  def user
    user = User.find(user_id)
    json_user = JSON.parse(user.to_json)
    json_user['primary_phone_number'] = user.phone_numbers.first.number
    json_user['secondary_phone_number'] = user.phone_numbers.second.number
    json_user['address'] = user.address.address
    json_user['city'] = user.address.city
    json_user['state'] = user.address.state
    json_user['zip'] = user.address.zip
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
