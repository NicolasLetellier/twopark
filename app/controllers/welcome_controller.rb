class WelcomeController < ApplicationController

	def index
		@parkings = Parking.all
	end

end
