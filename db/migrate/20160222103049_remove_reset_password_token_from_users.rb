class RemoveResetPasswordTokenFromUsers < ActiveRecord::Migration
  def change
  	remove_column :users, :reset_password_token
  end
end
