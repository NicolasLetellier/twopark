
(function(){

	var Map = window.TwoparkApp.Map = function () {
		this.coordinates = {};
		this.googleMap = {};
		this.markers = [];
		this.parkings = [];
		this.loggedIn = $("body").attr("data-logged");
		this.search = [];
	};

	Map.prototype.defaultLocation = function () {
		this.coordinates.latitude = 41.39487;
		this.coordinates.longitud = 2.17575;
		this.displayMap();
	};

	Map.prototype.fetchParkings = function () {
		var url = "";
		if (this.loggedIn === "true") {
			url = "/parkings/show_parking.json";
		} else {
			url = "/welcome/show_parking.json";
		}
		var promise = $.get(url);
		promise.done(this.filterJson.bind(this));
	};

	Map.prototype.filterJson = function (parkingsJson) {
		this.parkings = parkingsJson.show_parking;
		this.dropMarkers();		
	};

	Map.prototype.clearMarkers = function () {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
		this.markers = [];
	};

	Map.prototype.clickSearch = function () {
		$(".search-parking-button").on("click", this.fetchSearch.bind(this));
	};

	Map.prototype.fetchSearch = function (event) {
		event.preventDefault();
		this.search = [];
		var weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
		for (var i = 0 ; i < weekDays.length ; i++){
			var objectSchedule = {};
			var liDay = $("#" + weekDays[i]);
			objectSchedule.day = liDay.children().first().attr("class");
			var liTimeElements = liDay.find("input");
			for (var j = 0 ; j < liTimeElements.length ; j++){
				var key = $(liTimeElements[j]).attr("class");
				objectSchedule[key] = $(liTimeElements[j]).val();
			}
			this.search.push(objectSchedule);
		}
		this.dropMarkers();
	};

	Map.prototype.decimalHours = function (hour, minutes) {
		return (hour + (minutes / 60));
	};

	Map.prototype.percentSearchMatching = function (parking) {
		var schedules = parking.schedules;
		var search = this.search;
		var countHoursUnmatched = 0;
		var totalHoursSearch = 0;
		for (var i = 0 ; i < search.length ; i++ ){
			var searchDay = search[i].day;
			var checkDayMatch = false;
			if (search[i].start_hour !== "" && search[i].start_minutes !== "" && search[i].end_hour !== "" && search[i].end_minutes !== "" ) {
				var searchStartHour = this.decimalHours(parseInt(search[i].start_hour), parseInt(search[i].start_minutes));
				var searchEndHour = this.decimalHours(parseInt(search[i].end_hour), parseInt(search[i].end_minutes));
				totalHoursSearch += (searchEndHour - searchStartHour);
				for (var j = 0 ; j < schedules.length; j++) {
					if (schedules[j].day === searchDay) {
						checkDayMatch = true;
						var schedule = schedules[j];
						var scheduleStartHour = this.decimalHours(schedule.start_hour, schedule.start_minutes);
						var scheduleEndHour = this.decimalHours(schedule.end_hour, schedule.end_minutes);
						if (searchStartHour < scheduleStartHour) {
							countHoursUnmatched += (scheduleStartHour - searchStartHour);
						}
						if (searchEndHour > scheduleEndHour) {
							countHoursUnmatched += (searchEndHour - scheduleEndHour);
						}
					}
				}
				if (!checkDayMatch) {
					countHoursUnmatched += (searchEndHour - searchStartHour);
				}
			}
		}
		parking.percentMatching = ((totalHoursSearch - countHoursUnmatched) / totalHoursSearch * 100);
		return parking;
	};

	Map.prototype.dropMarkers = function() {
		this.clearMarkers();
		var parkings = this.parkings;
		var parking = {};
		for (var i = 0; i < parkings.length; i++) {
			if (this.search.length > 0) {
				parking = this.percentSearchMatching(parkings[i]);
			} else {
				parking = parkings[i];
			}
			this.createMarkersWithTimeout(parking, i*80);
		}
	};

	Map.prototype.createMarkersWithTimeout = function (parking, timeout) {
		var that = this;
		var url = "";
		if (that.loggedIn === "true" && parking.my_parking) {
			url = "http://www.perso.nicolasletellier.com/twopark/markergris.png";
		} else if (this.search.length > 0) {
			if (parking.percentMatching < 50) {
				url = "http://www.perso.nicolasletellier.com/twopark/markerorange.png";
			} else if (parking.percentMatching < 75) {
				url = "http://www.perso.nicolasletellier.com/twopark/markerjaune.png";
			} else if (parking.percentMatching < 100) {
				url = "http://www.perso.nicolasletellier.com/twopark/markervert.png";
			} else if (parking.percentMatching === 100) {
				url = "http://www.perso.nicolasletellier.com/twopark/markertwoparkgris.png";
			}
		} else {
			url = "http://www.perso.nicolasletellier.com/twopark/markertwoparkfull.png";
		}
		window.setTimeout(function(){
			var image = {
				url: url,
				size: new google.maps.Size(24, 38),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(12, 38)
			};
			var shape = {
				coords: [0, 6, 6, 0, 18, 0, 24, 6, 24, 18, 12, 38, 0, 18],
				type: "poly"
			};
			var marker = new google.maps.Marker({
				position: {lat: parseFloat(parking.lat), lng: parseFloat(parking.long)},
				map: that.googleMap,
				icon: image,
				shape: shape,
				title: parking.title,
				parking: parking,
				animation: google.maps.Animation.DROP
			});
			marker.addListener("click", that.clickMarker);
			that.markers.push(marker);
		}, timeout);
	};

	Map.prototype.clickMarker = function () {
		var divDisplay = $(".info-parking");
		var divRegister = $(".register-parking");
		var divSearch = $(".search-parking");
		var parking = this.parking;
		var htmlContent = "<p class='parking-title'>"
			+ parking.title
			+ "</p>"
			+ "<p class='parking-price'>Precio al mes: <strong>"
			+ parking.price
			+ " €</strong></p>"
			+ "<hr>";
		var schedule = "";
		for (var i = 0 ; i < parking.schedules.length ; i++ ) {
			schedule += "<p class='schedule-details'><span class='schedule-day'>"
			+ parking.schedules[i].day
			+ " : </span>"
			+ "<span class='schedule.hours'>"
			+ parking.schedules[i].start_hour
			+ ":"
			+ parking.schedules[i].start_minutes
			+ " / "
			+ parking.schedules[i].end_hour
			+ ":"
			+ parking.schedules[i].end_minutes
			+ "</span></p>";
		}
		htmlContent += "<p class='schedule-title'>Disponibilidad:</p>"
			+ schedule
			+ "<div id='toggleInfo'>"
			+ "<hr>"
			+ "<p class='address-info'>Dirrección: " + parking.street_name
			+ ", " + parking.street_number
			+ ", " + parking.postal_code + " " + parking.city
			+ ", " + parking.country
			+ "</p>";
		if ($("body").attr("data-logged") === "true") {
			htmlContent += "<p>Usuario: <strong>" + parking.owner_name + "</strong></p>"
			+ "<p><strong>" + parking.owner_email + " / " + parking.owner_telefon + "</strong></p>"
			+ "</div>";
		}
		if (divDisplay.html() != "") {
			divDisplay.fadeOut(150, function(){
				divDisplay.html(htmlContent);
			});
		} else {
			divDisplay.html(htmlContent);
		}
		divDisplay.slideDown(250);
		divRegister.slideDown(250);
		divSearch.slideDown(250);
	};

	Map.prototype.displayMap = function () {
		var stylesArrayPaledawn = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},
			{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},
			{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},
			{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},
			{"featureType":"poi.business","stylers":[{"visibility":"off"}]},
			{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},
			{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},
			{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},
			{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},
			{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},
			{"featureType":"transit.line","stylers":[{"visibility":"off"}]}];
		this.googleMap = new google.maps.Map(document.getElementById("map"), {
			zoom: 14,
			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_BOTTOM,
				mapTypeIds: [
				google.maps.MapTypeId.ROADMAP,
				google.maps.MapTypeId.SATELLITE
				]
			},
			center: new google.maps.LatLng(this.coordinates.latitude, this.coordinates.longitud),
		});
		this.googleMap.setOptions({styles: stylesArrayPaledawn});
		this.fetchParkings();
	};


})();