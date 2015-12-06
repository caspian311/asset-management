require 'rails_helper'

describe PhoneNumber do
  it { should have_db_column(:user_id).of_type(:integer) }
  it { should have_db_column(:number).of_type(:string) }
end


