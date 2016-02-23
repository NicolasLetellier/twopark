class ChangeTypeIntegerSchedule < ActiveRecord::Migration
  def change
  	change_column :schedules, :start_hour, :integer
  	change_column :schedules, :end_hour, :integer
  end
end
