class CreateParkings < ActiveRecord::Migration
  def change
    create_table :parkings do |t|
    	t.string :title
    	t.float :price
    	t.string :street_name
    	t.integer :street_number
    	t.integer :postal_code
    	t.string :city
    	t.string :country
    	t.decimal :lat
    	t.decimal :long
    	t.boolean :available
    	t.text :comments
    	t.float :monday_start
    	t.float :monday_end
    	t.float :tuesday_start
    	t.float :tuesday_end
    	t.float :wednesday_start
    	t.float :wednesday_end
    	t.float :thursday_start
    	t.float :thursday_end
    	t.float :friday_start
    	t.float :friday_end
    	t.float :saturday_start
    	t.float :saturday_end
    	t.float :sunday_start
    	t.float :sunday_end

    	t.belongs_to :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
