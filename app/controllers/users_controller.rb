class UsersController < ApplicationController

	def show
		@parkings = Parking.all
	end

end
