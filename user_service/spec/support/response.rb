module ResponseSupport
  def parse_body
    JSON.parse(response.body)
  end
end

RSpec.configure do |config|
  config.include ResponseSupport, type: :request
end

