require 'rails_helper'

describe User do
  it { should have_db_column(:first_name).of_type(:string) }
  it { should have_db_column(:last_name).of_type(:string) }
  it { should have_db_column(:email).of_type(:string) }
  it { should have_db_column(:password).of_type(:string) }

  describe 'valid data' do
    let(:valid_user) { User.new first_name: 'first', last_name: 'last', email: 'email', password: 'pass' }

    it 'be valid' do
      expect(valid_user.valid?).to be_truthy
    end
  end

  describe 'missing first name' do
    let(:invalid_user) { User.new  }

    it 'not be valid' do
      expect(invalid_user.valid?).to be_falsey
    end

    it 'to have correct errors' do
      invalid_user.valid?
      expect(invalid_user.errors.keys).to eq([:first_name, :last_name, :email, :password])
    end
  end
end
