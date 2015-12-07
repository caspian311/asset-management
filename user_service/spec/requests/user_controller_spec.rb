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

    context 'requeted user does not exist' do
      it 'return a 404' do
        get api_user_index_path, valid_credentials

        expect(response).to have_http_status(404)
      end
    end
  end

  context 'GET /api/user/{id}' do
    context 'user does not exist' do
      it 'should return a 404' do
        get api_user_path(456)

        expect(response).to have_http_status(404)
      end
    end

    context 'user does not have all their data' do
      let!(:user) { create :user }

      before(:each) do
        get api_user_path(user.id)
      end

      it 'should still return a 200' do
        expect(response).to have_http_status(200)
      end

      it 'should return the user data' do
        expect(parse_body['first_name']).to eq('Matt')
        expect(parse_body['last_name']).to eq('Todd')
        expect(parse_body['email']).to eq('matt@todd.net')
      end

      it 'should be missing the data that is not available' do
        expect(parse_body['primary_phone_number']).to be_nil
        expect(parse_body['secondary_phone_number']).to be_nil
        expect(parse_body['address']).to be_nil
        expect(parse_body['city']).to be_nil
        expect(parse_body['state']).to be_nil
      end
    end

    context 'user exists' do
      let!(:user) { create :user }
      let!(:address) { create :address }
      let!(:phone_number1) { create :phone_number }
      let!(:phone_number2) { create :phone_number, number: '555-555-0000' }

      before do
        user.address = address
        user.phone_numbers << phone_number1
        user.phone_numbers << phone_number2
      end

      before(:each) do
        get api_user_path(user.id)
      end

      it 'should return a 200' do
        expect(response).to have_http_status(200)
      end

      it 'should return the user data' do
        expect(parse_body['first_name']).to eq('Matt')
        expect(parse_body['last_name']).to eq('Todd')
        expect(parse_body['email']).to eq('matt@todd.net')
        expect(parse_body['primary_phone_number']).to eq('555-555-5555')
        expect(parse_body['secondary_phone_number']).to eq('555-555-0000')
        expect(parse_body['address']).to eq('123 Sesame St.')
        expect(parse_body['city']).to eq('New York City')
        expect(parse_body['state']).to eq('New York')
        expect(parse_body['zip']).to eq('12345')
      end
    end
  end
end
