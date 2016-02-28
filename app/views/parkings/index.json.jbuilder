
json.show_parking @parkings do |parking|
	json.title parking.title
	json.id parking.id
	json.price parking.price
	json.lat parking.lat
	json.long parking.long
	json.available parking.available
end
