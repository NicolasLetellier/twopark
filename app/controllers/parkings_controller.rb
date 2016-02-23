class ParkingsController < ApplicationController

	def index
		parkings = current_user.parkings
		render json: parkings
	end
	
end
