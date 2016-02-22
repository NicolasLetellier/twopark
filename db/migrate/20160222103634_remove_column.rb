class RemoveColumn < ActiveRecord::Migration
  def change
  	remove_column :users, :reset_password_sent_at
  end
end
