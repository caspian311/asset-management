require 'rails_helper'

describe Address do
  it { should have_db_column(:user_id).of_type(:integer) }
  it { should have_db_column(:address).of_type(:string) }
  it { should have_db_column(:city).of_type(:string) }
  it { should have_db_column(:state).of_type(:string) }
  it { should have_db_column(:zip).of_type(:string) }
end

