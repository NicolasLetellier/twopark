class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
    	t.string :day
    	t.float :start
    	t.float :end

    	t.belongs_to :parking, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
