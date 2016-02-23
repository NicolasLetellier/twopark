class ChangeTypePostalCode < ActiveRecord::Migration
  def change
  	change_column :parkings, :postal_code, :string
  end
end
