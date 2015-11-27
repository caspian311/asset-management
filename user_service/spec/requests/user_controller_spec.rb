require 'rails_helper'

describe Api::UserController do
  let(:first_name) { 'expected first name' }
  let(:last_name) { 'expected last name' }
  let(:password) { 'expected password' }
  let(:email) { 'expected email' }
  let(:valid_user) { { first_name: first_name, last_name: last_name, email: email, password: password } }
  let(:invalid_user) { {} }

  context 'POST /api/user' do
    context 'valid user data' do
      it 'should create the user' do
        post api_user_index_path, valid_user

        expect(User.count).to eq(1)
        expect(User.last.first_name).to eq(first_name)
        expect(User.last.last_name).to eq(last_name)
        expect(User.last.email).to eq(email)
        expect(User.last.password).to eq(password)
      end

      it 'should respond with OK' do
        post api_user_index_path, valid_user

        expect(response.status).to eq(200)
      end
    end

    context 'invalid user data' do
      it 'should not create the user' do
        post api_user_index_path, invalid_user

        expect(User.count).to eq(0)
      end

      it 'should respond with bad request' do
        post api_user_index_path, invalid_user

        expect(response.status).to eq(400)
      end
    end
  end

  context 'GET /api/user' do
    let(:email) { 'email@address.com' }
    let(:password) { 'password' }
    let(:valid_credentials) { { email: email, password: password } }

    context 'requeted user exists' do
      let(:first_name) { 'first' }
      let(:last_name) { 'last' }
      let!(:user) { create :user, first_name: first_name, last_name: last_name, email: email, password: password }

      it 'should return a 200' do
        get api_user_index_path, valid_credentials

        expect(response).to have_http_status(200)
      end

      it 'should return the user data' do
        get api_user_index_path, valid_credentials

        expect(parse_body['first_name']).to eq(first_name)
        expect(parse_body['last_name']).to eq(last_name)
        expect(parse_body['email']).to eq(email)
      end
    end

    def parse_body
      JSON.parse(response.body)
    end

    context 'requeted user does not exist' do
      it 'return a 404' do
        get api_user_index_path, valid_credentials

        expect(response).to have_http_status(404)
      end
    end
  end
end
