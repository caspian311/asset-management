class Api::UserController < ApplicationController
  respond_to :json

  def create
    render nothing: true
  end
end
