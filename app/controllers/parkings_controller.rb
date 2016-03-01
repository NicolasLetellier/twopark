class ParkingsController < ApplicationController

	def index
	end

	def show_parking
		@parkings = Parking.all
	end

	def new
	end

end
