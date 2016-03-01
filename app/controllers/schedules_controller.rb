class SchedulesController < ApplicationController

	def new
		@parking = Parking.find params[:parking_id]
		@schedules = @parking.schedules
	end

	def create
		
	end

	def update
	end

	private

	def schedule_params
		params.require(:schedule).permit(:day, :start_hour, :start_minutes, :end_hour, :end_minutes, :parking_id)
	end

end
