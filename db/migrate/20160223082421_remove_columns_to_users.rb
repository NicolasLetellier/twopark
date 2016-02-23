class RemoveColumnsToUsers < ActiveRecord::Migration
  def change
  	remove_column :users, :telefon_public
  	remove_column :users, :email_public
  end
end
