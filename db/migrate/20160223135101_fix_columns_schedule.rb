class FixColumnsSchedule < ActiveRecord::Migration
  def change
		rename_column :schedules, :start, :start_hour
		rename_column :schedules, :end, :end_hour

		add_column :schedules, :start_minutes, :integer
		add_column :schedules, :end_minutes, :integer

	end
end
