class WelcomeController < ApplicationController

	def index
		if user_signed_in?
			redirect_to user_path(current_user.id)
		else
			render "index"
		end
	end

	def show_parking
		@parkings = Parking.all
		@parkings.each do |parking|
			parking[:hours] = parking.total_hours
		end
	end

end
