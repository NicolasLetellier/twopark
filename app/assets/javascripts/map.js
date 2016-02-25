
(function(){

	var Map = window.TwoparkApp.Map = function () {
		this.coordinates = {};
		this.options = {
			enableHighAccuracy: true
		};
		this.googleMap = {};
		this.markers = [];
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
		var promise = $.get("/parkings");
		promise.done(this.retrieveMarkers.bind(this));
	};

	Map.prototype.clearMarkers = function () {
		for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  	}
  	this.markers = [];
	};

	Map.prototype.retrieveMarkers = function (response) {
		this.clearMarkers();
		var that = this;
		for (var i = 0; i < response.length; i++) {
			if (response[i].available) {
				var position = {lat: parseFloat(response[i].lat), lng: parseFloat(response[i].long)};
				var title = response[i].title;
				that.createMarkersWithTimeout(position, title, i*100);
			}
		};
	};

	Map.prototype.createMarkersWithTimeout = function (position, title, timeout) {
		var that = this;
		window.setTimeout(function(){
			that.markers.push(new google.maps.Marker({
				position: position,
				map: that.googleMap,
				title: title,
				animation: google.maps.Animation.DROP
			}));
		}, timeout);
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
		
		var stylesArrayLightdream = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
		var stylesArraySubtlegrayscale = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-96}]}];
		
		var stylesArrayBlueessence = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},
			{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},
			{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"off"}],"elementType":"labels","stylers":[{"visibility":"off"}]},
			{"featureType":"road","elementType":"geometry","stylers":[{"lightness":50},{"visibility":"on"}]},
			{"featureType":"road","elementType":"labels.icon","stylers":[{"saturation":-50},{"lightness":30},{"visibility":"on"}]},
			{"featureType":"road.local","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
			{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},
			{"featureType":"transit.line","stylers":[{"visibility":"off"}]}, 
			{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}];

		this.googleMap = new google.maps.Map(document.getElementById("map"), {
			zoom: 14,
			center: new google.maps.LatLng(this.coordinates.latitude, this.coordinates.longitud),
		});

		this.googleMap.setOptions({styles: stylesArrayPaledawn});

		this.fetchParkings();

	};


})();