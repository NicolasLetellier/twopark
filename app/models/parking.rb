class Parking < ActiveRecord::Base
	belongs_to :user
	has_many :schedules

	def total_hours
		total_hours = 0
		self.schedules.each do |schedule|
			start_minutes = schedule.start_minutes / 60
			end_minutes = schedule.end_minutes / 60
			total_hours = total_hours
				+ (schedule.end_hour + end_minutes)
				- (schedule.start_hour + start_minutes)
		end
		total_hours
	end

end
