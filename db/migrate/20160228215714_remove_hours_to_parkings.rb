class RemoveHoursToParkings < ActiveRecord::Migration
  def change
  	remove_column :parkings, :hours
  end
end
