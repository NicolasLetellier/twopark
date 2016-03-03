
json.show_parking @parkings do |parking|
	json.title parking.title
	json.id parking.id
	json.price parking.price
	json.lat parking.lat
	json.long parking.long
	json.available parking.available
	json.hours parking.total_hours
	json.my_parking current_user.id == parking.user_id
	json.user_id parking.user_id
	json.comments parking.comments
	json.street_name parking.street_name
	json.street_number parking.street_number
	json.postal_code parking.postal_code
	json.city parking.city
	json.country parking.country


	json.schedules parking.schedules do |schedule|
		json.day schedule.day
		json.start_hour schedule.start_hour
		json.start_minutes schedule.start_minutes
		json.end_hour schedule.end_hour
		json.end_minutes schedule.end_minutes
	end
end

json.show_user @users do |user|
	json.id user.id
	json.name user.name
	json.email user.email
	json.telefon user.telefon
end
