require 'rails_helper'

describe Api::SessionController do
  let(:email) { 'matt@todd.net' }
  let(:password) { 'secret' }
  let!(:user) { create :user, email: email, password: password, first_name: 'Matt', last_name: 'Todd' }
  let(:valid_credentials) { { email: email, password: password } }

  context 'user is not logged in' do
    context '#index' do
      it 'return 200' do
        get api_session_index_path

        expect(response).to have_http_status(401)
      end
    end
  end

  context 'user is logged in' do
    before do
      post api_session_index_path, valid_credentials
    end

    after do
      delete api_session_path('user')
    end

    context '#index' do
      it 'return 200' do
        get api_session_index_path

        expect(response).to have_http_status(200)
      end

      it 'return users information' do
        get api_session_index_path

        expect(parsed_body['email']).to eq('matt@todd.net')
        expect(parsed_body['name']).to eq('Matt Todd')
      end

      it 'dont return user sensitive info' do
        get api_session_index_path

        expect(parsed_body['password']).to be_nil
      end
    end

    context '#destroy' do
      it 'should log out the user' do
        delete api_session_path('user')

        get api_session_index_path

        expect(response).to have_http_status(401)
      end
    end
  end

  def parsed_body
    JSON.parse response.body
  end

  context 'user presents valid credentials' do
    context '#create' do
      it 'return 201' do
        post api_session_index_path, valid_credentials

        expect(response).to have_http_status(201)
      end
    end
  end

  context 'user presents invalid credentials' do
    let(:invalid_credentials) { { email: email, password: 'monkey' } }

    context '#create' do
      it 'return 401' do
        post api_session_index_path, invalid_credentials

        expect(response).to have_http_status(401)
      end
    end
  end
end
