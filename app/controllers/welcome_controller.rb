class WelcomeController < ApplicationController
	layout "bootstrap_application"


	def index
		@parkings = Parking.all
	end

end
