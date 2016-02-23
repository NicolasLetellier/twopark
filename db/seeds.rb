# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Parking.create(title: "Parking mediano en C/ Sant Ramon", price: 45, street_name: "Carrer Sant Ramon", street_number: 8,
# 	postal_code: "08001", city: "barcelona", country: "spain", lat: 41.37796, long: 2.17153, available: true,
# 	comments: "Parking de tamaño mediano. Entrada facil. Precio negociable, por favor contactarme.", user_id: 5 )

# Parking.create(title: "Parking calle Joan d'Àustria, 65", price: 40, street_name: "Carrer Joan d'Àustria", street_number: 65,
# 	postal_code: "08005", city: "barcelona", country: "spain", lat: 41.39351, long: 2.19063, available: true,
# 	comments: "Plaza de parking de muy facil acceso, tamaño mediano. Hay que verlo, esta muy bien.", user_id: 5 )

# Parking.create(title: "Plaza de parking a compartir en Rambla del Raval", price: 52, street_name: "Rambla del Raval", street_number: 4,
# 	postal_code: "08001", city: "barcelona", country: "spain", lat: 41.37934, long: 2.16811, available: true,
# 	comments: "Plaza para compartir en el numero 4 de la Rambla del Raval. El barrio es animado, pero el parking tiene video vigilencia, es muy seguro", user_id: 5 )

# Parking.create(title: "Plaza para coche grande y moto", price: 42, street_name: "Gran Via de les Corts Catalanes", street_number: 256,
# 	postal_code: "08004", city: "barcelona", country: "spain", lat: 41.37057, long: 2.14362, available: true,
# 	comments: "Plaza de parking muy grande, caben un coche grande y una moto. La altura esta limitada a 1,8 m.", user_id: 6 )

# Parking.create(title: "Buena plaza para compartir!", price: 54, street_name: "Gran Via de les Corts Catalanes", street_number: 547,
# 	postal_code: "08011", city: "barcelona", country: "spain", lat: 41.38354, long: 2.16001, available: true,
# 	comments: "Plaza de parking ideal para compartir, situada cerca de la famosa panaderia Mistoles", user_id: 6 )

# Parking.create(title: "Parking en Gran Via", price: 50, street_name: "Gran Via de les Corts Catalanes", street_number: 986,
# 	postal_code: "08016", city: "barcelona", country: "spain", lat: 41.41085, long: 2.19785, available: true,
# 	comments: "Parking de tamaño mediano. Entrada facil. Precio negociable, por favor contactarme.", user_id: 6 )

# Parking.create(title: "Plaza de parking pequeña pero de muy facil acceso", price: 65, street_name: "Carrer de la Marina", street_number: 124,
# 	postal_code: "08013", city: "barcelona", country: "spain", lat: 41.39645, long: 2.18516, available: true,
# 	comments: "La plaza es un poco pequaña (para coches tipo peugeot 205), pero se accede muy facilmente. el parking esta bien iluminado y tiene vigilante", user_id: 6 )

# Parking.create(title: "en passeo de gracia", price: 45, street_name: "Passeo de Gracia", street_number: 126,
# 	postal_code: "08012", city: "barcelona", country: "spain", lat: 41.39784, long: 2.15839, available: true,
# 	comments: "Parking de tamaño mediano. Entrada facil. Precio no negociable, por favor contactarme para verlo.", user_id: 6 )

# Parking.create(title: "Parking para compartir en Via Augusta", price: 50, street_name: "Via Augusta", street_number: 123,
# 	postal_code: "08006", city: "barcelona", country: "spain", lat: 41.40024, long: 2.14564, available: true,
# 	comments: "Plaza de parking de tamaño estandar. Hay muchas columnas para evitar, mejor verlo.", user_id: 7 )

# Parking.create(title: "Plaza barata para compartir pocas horas", price: 30, street_name: "Carrer Meridiana", street_number: 324,
# 	postal_code: "08027", city: "barcelona", country: "spain", lat: 41.42497, long: 2.18710, available: true,
# 	comments: "Plaza disponible para pocas horas cada dia, por esto esta propuesta a un precio interesante.", user_id: 7 )


# Schedule.create(day: "monday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 1)
# Schedule.create(day: "tuesday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 1)
# Schedule.create(day: "wednesday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 1)
# Schedule.create(day: "thursday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 1)
# Schedule.create(day: "friday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 1)

# Schedule.create(day: "monday", start_hour: 9, start_minutes: 30, end_hour: 17, end_minutes: 30, parking_id: 2)
# Schedule.create(day: "tuesday", start_hour: 9, start_minutes: 30, end_hour: 17, end_minutes: 30, parking_id: 2)
# Schedule.create(day: "wednesday", start_hour: 9, start_minutes: 30, end_hour: 17, end_minutes: 30, parking_id: 2)
# Schedule.create(day: "thursday", start_hour: 9, start_minutes: 30, end_hour: 17, end_minutes: 30, parking_id: 2)
# Schedule.create(day: "friday", start_hour: 9, start_minutes: 30, end_hour: 17, end_minutes: 30, parking_id: 2)

# Schedule.create(day: "monday", start_hour: 10, start_minutes: 15, end_hour: 17, end_minutes: 0, parking_id: 3)
# Schedule.create(day: "tuesday", start_hour: 10, start_minutes: 15, end_hour: 17, end_minutes: 0, parking_id: 3)
# Schedule.create(day: "wednesday", start_hour: 10, start_minutes: 15, end_hour: 17, end_minutes: 0, parking_id: 3)
# Schedule.create(day: "thursday", start_hour: 10, start_minutes: 15, end_hour: 17, end_minutes: 0, parking_id: 3)
# Schedule.create(day: "friday", start_hour: 10, start_minutes: 15, end_hour: 17, end_minutes: 0, parking_id: 3)

# Schedule.create(day: "monday", start_hour: 8, start_minutes: 0, end_hour: 19, end_minutes: 0, parking_id: 4)
# Schedule.create(day: "tuesday", start_hour: 8, start_minutes: 30, end_hour: 19, end_minutes: 0, parking_id: 4)
# Schedule.create(day: "wednesday", start_hour: 8, start_minutes: 30, end_hour: 19, end_minutes: 0, parking_id: 4)
# Schedule.create(day: "thursday", start_hour: 8, start_minutes: 30, end_hour: 19, end_minutes: 0, parking_id: 4)
# Schedule.create(day: "friday", start_hour: 8, start_minutes: 30, end_hour: 24, end_minutes: 0, parking_id: 4)
# Schedule.create(day: "saturday", start_hour: 0, start_minutes: 0, end_hour: 24, end_minutes: 0, parking_id: 4)
# Schedule.create(day: "sunday", start_hour: 0, start_minutes: 0, end_hour: 24, end_minutes: 0, parking_id: 4)

# Schedule.create(day: "tuesday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 5)
# Schedule.create(day: "wednesday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 5)
# Schedule.create(day: "thursday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 5)
# Schedule.create(day: "friday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 5)
# Schedule.create(day: "saturday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 5)

# Schedule.create(day: "monday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 6)
# Schedule.create(day: "tuesday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 6)
# Schedule.create(day: "wednesday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 6)
# Schedule.create(day: "thursday", start_hour: 8, start_minutes: 30, end_hour: 18, end_minutes: 30, parking_id: 6)
# Schedule.create(day: "friday", start_hour: 8, start_minutes: 30, end_hour: 15, end_minutes: 30, parking_id: 6)

# Schedule.create(day: "monday", start_hour: 8, start_minutes: 15, end_hour: 17, end_minutes: 45, parking_id: 7)
# Schedule.create(day: "tuesday", start_hour: 8, start_minutes: 15, end_hour: 17, end_minutes: 45, parking_id: 7)
# Schedule.create(day: "wednesday", start_hour: 8, start_minutes: 15, end_hour: 17, end_minutes: 45, parking_id: 7)
# Schedule.create(day: "thursday", start_hour: 8, start_minutes: 15, end_hour: 18, end_minutes: 30, parking_id: 7)
# Schedule.create(day: "friday", start_hour: 8, start_minutes: 15, end_hour: 17, end_minutes: 45, parking_id: 7)

# Schedule.create(day: "monday", start_hour: 9, start_minutes: 0, end_hour: 19, end_minutes: 30, parking_id: 8)
# Schedule.create(day: "tuesday", start_hour: 9, start_minutes: 0, end_hour: 19, end_minutes: 30, parking_id: 8)
# Schedule.create(day: "wednesday", start_hour: 9, start_minutes: 0, end_hour: 19, end_minutes: 30, parking_id: 8)
# Schedule.create(day: "thursday", start_hour: 9, start_minutes: 0, end_hour: 19, end_minutes: 30, parking_id: 8)
# Schedule.create(day: "friday", start_hour: 9, start_minutes: 0, end_hour: 18, end_minutes: 30, parking_id: 8)

# Schedule.create(day: "monday", start_hour: 5, start_minutes: 15, end_hour: 16, end_minutes: 0, parking_id: 9)
# Schedule.create(day: "tuesday", start_hour: 5, start_minutes: 15, end_hour: 16, end_minutes: 0, parking_id: 9)
# Schedule.create(day: "wednesday", start_hour: 5, start_minutes: 15, end_hour: 16, end_minutes: 0, parking_id: 9)
# Schedule.create(day: "thursday", start_hour: 5, start_minutes: 15, end_hour: 16, end_minutes: 0, parking_id: 9)
# Schedule.create(day: "friday", start_hour: 5, start_minutes: 15, end_hour: 16, end_minutes: 0, parking_id: 9)

# Schedule.create(day: "monday", start_hour: 8, start_minutes: 0, end_hour: 15, end_minutes: 15, parking_id: 10)
# Schedule.create(day: "tuesday", start_hour: 8, start_minutes: 0, end_hour: 15, end_minutes: 15, parking_id: 10)
# Schedule.create(day: "wednesday", start_hour: 8, start_minutes: 0, end_hour: 15, end_minutes: 15, parking_id: 10)
# Schedule.create(day: "thursday", start_hour: 8, start_minutes: 0, end_hour: 15, end_minutes: 15, parking_id: 10)
# Schedule.create(day: "friday", start_hour: 8, start_minutes: 0, end_hour: 15, end_minutes: 15, parking_id: 10)
