class Parking < ActiveRecord::Base
	belongs_to :user
	has_many :schedules

	def total_hours 
		hours = 0
		schedules.each do |schedule|
			start_minutes = schedule.start_minutes / 60
			end_minutes = schedule.end_minutes / 60
			hours = hours + (schedule.end_hour + end_minutes) - (schedule.start_hour + start_minutes)
		end
		hours
	end

end
