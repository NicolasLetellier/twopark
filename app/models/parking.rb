class Parking < ActiveRecord::Base
	belongs_to :user
	has_many :schedules
end
