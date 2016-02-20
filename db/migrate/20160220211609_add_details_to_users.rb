class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :telefon, :integer
    add_column :users, :telefon_public, :boolean
    add_column :users, :email_public, :boolean
  end
end
