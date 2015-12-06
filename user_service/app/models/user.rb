class User < ActiveRecord::Base
  validates_presence_of :first_name, :last_name, :email, :password
  has_many :phone_numbers
  has_one :address
end
