class RemoveColumnsToParking < ActiveRecord::Migration
  def change
  	remove_column :parkings, :monday_start
  	remove_column :parkings, :monday_end
  	remove_column :parkings, :tuesday_start
  	remove_column :parkings, :tuesday_end
  	remove_column :parkings, :wednesday_start
  	remove_column :parkings, :wednesday_end
  	remove_column :parkings, :thursday_start
  	remove_column :parkings, :thursday_end
  	remove_column :parkings, :friday_start
  	remove_column :parkings, :friday_end
  	remove_column :parkings, :saturday_start
  	remove_column :parkings, :saturday_end
  	remove_column :parkings, :sunday_start
  	remove_column :parkings, :sunday_end

  end
end
