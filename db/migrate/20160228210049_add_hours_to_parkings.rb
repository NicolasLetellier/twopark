class AddHoursToParkings < ActiveRecord::Migration
  def change
  	add_column :parkings, :hours, :float
  end
end
