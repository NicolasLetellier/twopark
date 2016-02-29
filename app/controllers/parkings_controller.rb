class ParkingsController < ApplicationController

	def index
	end

	def show_parking
		@parkings = Parking.all
	end

end
