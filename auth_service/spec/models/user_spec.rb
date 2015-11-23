require 'rails_helper'

describe User do
  let!(:user) { create :user }

  describe '#name' do
    it 'should combine first and last' do
      expect(user.name).to eq('Matt Todd')
    end
  end
end
