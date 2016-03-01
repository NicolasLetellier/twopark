class ParkingsController < ApplicationController

	def index
	end

	def show_parking
		@parkings = Parking.all
	end

	def new
		@parking = Parking.new
	end

	def create
		@parking = Parking.new(parking_params)
		if @parking.save
			flash[:alert] = "Parking creado correctamente"
			redirect_to action: 'new', controller: 'schedules', parking_id: @parking.id
		else
			render "new"
		end
	end

	def update
	end

	def destroy
	end

	private

	def parking_params
		params.require(:parking).permit(:title, :price, :street_name, :street_number, :postal_code, :city, :country, :lat, :long, :available, :comments, :user_id)
	end

end
