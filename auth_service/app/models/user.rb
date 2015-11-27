class User
  def self.find_by credentials
    response = Faraday.new(url: endpoint).get do |request|
      request.params[:email] = credentials[:email]
      request.params[:password] = credentials[:password]
    end
    JSON.parse(response.body) if response.status == 200
  end

  private

  def self.endpoint
    'http://localhost:3001/api/user'
  end
end

