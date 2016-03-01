
json.show_parking @parkings do |parking|
	json.title parking.title
	json.id parking.id
	json.price parking.price
	json.lat parking.lat
	json.long parking.long
	json.available parking.available
	json.hours parking.total_hours
	json.my_parking current_user.id == parking.user_id

	json.schedules parking.schedules do |schedule|
		json.day schedule.day
		json.start_hour schedule.start_hour
		json.start_minutes schedule.start_minutes
		json.end_hour schedule.end_hour
		json.end_minutes schedule.end_minutes
	end

end
