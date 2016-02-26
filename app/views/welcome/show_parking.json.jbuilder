
json.index_show_parkings @parkings do |parking|
	json.title parking.title
	json.id parking.id
	json.price parking.price
	json.hours parking.hours

end
