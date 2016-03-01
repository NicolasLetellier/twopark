
(function(){

	var Map = window.TwoparkApp.Map = function () {
		this.coordinates = {};
		this.options = {
			enableHighAccuracy: true
		};
		this.googleMap = {};
		this.markers = [];
		this.parkings = [];
		this.loggedIn = $("body").attr("data-logged");
	};

	Map.prototype.getLocation = function () {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(this.onLocation.bind(this), this.onError.bind(this), this.options);
		} else {
		  console.log("Geolocation is not available (default map center on Barcelona)")
		  this.defaultLocation.bind(this)();
		}
	};

	Map.prototype.onLocation = function (position) {
		this.coordinates.latitude = position.coords.latitude;
		this.coordinates.longitud = position.coords.longitude;
		this.displayMap();
	};

	Map.prototype.onError = function () {
		console.log("Getting location failed (default map center on Barcelona): " + error);
		this.defaultLocation.bind(this)();
	};

	Map.prototype.defaultLocation = function () {
		this.coordinates.latitude = 41.39487;
		this.coordinates.longitud = 2.17575;
		this.displayMap();
	};

	Map.prototype.fetchParkings = function () {
		if (this.loggedIn === "true") {
			var url = "/parkings/show_parking.json";
		} else {
			var url = "/welcome/show_parking.json";
		}
		var promise = $.get(url);
		promise.done(this.dropMarkers.bind(this));
	};

	Map.prototype.clearMarkers = function () {
		for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  	}
  	this.markers = [];
	};

	// var Parking = function (attrs) {
	// 	this._attrs = attrs;
	// 	this.title = this._attrs.title;
	// };

	// Parking.prototype.get = function(key) {
	// 	return this._attrs[key];
	// };

	Map.prototype.dropMarkers = function (parkingsJson) {
		this.clearMarkers();
		for (var i = 0; i < parkingsJson.show_parking.length; i++) {
			if (parkingsJson.show_parking[i].available) {
				// var parking = new Parking(parkingsJson.show_parking[i]);
				// parking.title
				// parking.get("title")
				// this.parkings.push(parking);
				
				var position = {lat: parseFloat(parkingsJson.show_parking[i].lat), lng: parseFloat(parkingsJson.show_parking[i].long)};
				var title = parkingsJson.show_parking[i].title;
				var parking = parkingsJson.show_parking[i];
				this.createMarkersWithTimeout(position, title, parking, i*80);
			}
		};
	};

	Map.prototype.createMarkersWithTimeout = function (position, title, parking, timeout) {
		var that = this;
		if (this.loggedIn === "true") {
			var url = "http://www.perso.nicolasletellier.com/twopark/markertwoparkgris.png";
		} else {
			var url = "http://www.perso.nicolasletellier.com/twopark/markertwoparkfull.png";
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
				position: position,
				map: that.googleMap,
				icon: image,
				shape: shape,
				title: title,
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
		var htmlContent = "<p class='parking-title'>"
			+ this.parking.title
			+ "</p>"
			+ "<p class='parking-price'>Precio al mes: <strong>"
			+ this.parking.price
			+ " €</strong></p>"
			+ "<hr>";
		if ($("body").attr("data-logged") === "true") {
			var schedule = "";
			for (var i = 0 ; i < this.parking.schedules.length ; i++ ) {
				schedule += "<p class='schedule-details'><span class='schedule-day'>"
				+ this.parking.schedules[i].day
				+ " : </span>"
				+ "<span class='schedule.hours'>"
				+ this.parking.schedules[i].start_hour
				+ ":"
				+ this.parking.schedules[i].start_minutes
				+ " / "
				+ this.parking.schedules[i].end_hour
				+ ":"
				+ this.parking.schedules[i].end_minutes
				+ "</span></p>";
			}
			htmlContent += "<p class='schedule-title'>Disponibilidad:</p>"
				+ schedule;
		} else {
			var divInvitation = $(".invitation");
			htmlContent += "<p class='parking-hours'>Horas disponibles durante la semana: <strong>"
				+ this.parking.hours
				+ "</strong>h";
			divInvitation.slideDown(250);
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

	Map.prototype.displayParkingWelcome = function (marker) {
		debugger
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