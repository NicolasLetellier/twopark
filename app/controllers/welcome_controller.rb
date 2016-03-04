class WelcomeController < ApplicationController

	def index
		if user_signed_in?
			redirect_to parkings_path
		else
			render "index"
		end
	end

	def show_parking
		@parkings = Parking.all
		@users = User.all
	end

end
