require 'rails_helper'

describe Api::SessionController do
  let(:endpoint_base) { configatron.services.user }
  let(:email) { 'some@email.com' }
  let(:password) { 'some pass' }
  let(:credentials) { { email: email, password: password } }

  def endpoint
    "#{endpoint_base}?email=#{email}&password=#{password}"
  end

  before do
    allow(subject).to receive(:cookies) { {} }
  end

  context 'user is not logged in' do
    before do
      allow(subject).to receive(:cookies) { {} }
    end

    context '#create' do
      context 'invalid credentials are provided' do
        before do
          stub_request(:get, endpoint).to_return(:status => 404, :body => "")
        end

        it 'should return a 401' do
          post api_session_index_path, credentials

          expect(response).to have_http_status(401)
        end

        it 'should not populate user data in cookies' do
          post api_session_index_path, credentials

          expect(response.cookies['user']).to be_nil
        end
      end

      context 'valid credentials are provided' do
        before do
          stub_request(:get, endpoint).to_return(:status => 200, :body => user_data)
        end

        it 'should return a 200' do
          post api_session_index_path, credentials

          expect(response).to have_http_status(201)
        end

        it 'should populate user data in cookies' do
          post api_session_index_path, credentials

          expect(response.cookies['user']).to eq(JSON.generate({ name: 'John Doe', email: 'john@doe.com' }))
        end
      end

      def user_data
        JSON.generate({ first_name: 'John', last_name: 'Doe', email: 'john@doe.com' })
      end
    end
  end
end

