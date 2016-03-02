class SchedulesController < ApplicationController

	def new
		if !user_signed_in?
			redirect_to root_path
		else
			@parking = Parking.find params[:parking_id]
			@schedule = @parking.schedules.new
		end
	end

	def create
		@parking = Parking.find params[:parking_id]
		@schedule = Schedule.new(schedule_params)
		if @schedule.save
			flash[:notice] = "Horario grabado correctamente"
			redirect_to new_parking_schedule_path(@parking)
		else
			redirect_to new_parking_schedule_path(@parking)
		end
	end

	def update
	end

	private

	def schedule_params
		params.require(:schedule).permit(:day, :start_hour, :start_minutes, :end_hour, :end_minutes, :parking_id)
	end

end
