class ParkingsController < ApplicationController

	def index
		render json: Parking.all
	end
	
end
