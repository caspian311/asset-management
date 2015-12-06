class CreateContactInfo < ActiveRecord::Migration
  def change
    create_table :phone_numbers do |t|
      t.belongs_to :user
      t.string :number
    end

    create_table :addresses  do |t|
      t.belongs_to :user
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
    end
  end
end
