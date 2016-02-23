class WelcomeController < ApplicationController

	def index
		if user_signed_in?
			redirect_to user_path(current_user.id)
		else
			@parkings = Parking.all
		end
	end

end
