class JsonUserHandler
  def json_user(user)
    json_user = JSON.parse(user.to_json)
    json_user = populate_phone_numbers user, json_user
    json_user = populate_address user, json_user
    json_user
  end

  private 
  
  def populate_phone_numbers(user, json_user)
    if user.phone_numbers.first
      json_user['primary_phone_number'] = user.phone_numbers.first.number
    end

    if user.phone_numbers.second
      json_user['secondary_phone_number'] = user.phone_numbers.second.number
    end

    json_user
  end

  def populate_address(user, json_user)
    return json_user unless user.address

    json_user['address'] = user.address.address
    json_user['city'] = user.address.city
    json_user['state'] = user.address.state
    json_user['zip'] = user.address.zip
    json_user
  end
end
