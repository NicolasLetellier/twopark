
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
		promise.done(this.dropMarkers.bind(this));
	};

	Map.prototype.clearMarkers = function () {
		for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  	}
  	this.markers = [];
	};

	Map.prototype.dropMarkers = function (parkings) {
		this.clearMarkers();
		// add all parkings objects to an array
		for (var i = 0; i < parkings.length; i++) {
			if (parkings[i].available) {
				var position = {lat: parseFloat(parkings[i].lat), lng: parseFloat(parkings[i].long)};
				var title = parkings[i].title;
				var parkingId = parkings[i].id;
				this.createMarkersWithTimeout(position, title, parkingId, i*80);
			}
		};
	};

	Map.prototype.createMarkersWithTimeout = function (position, title, parkingId, timeout) {
		var that = this;
		window.setTimeout(function(){
			var marker = new google.maps.Marker({
				position: position,
				map: that.googleMap,
				title: title,
				parkingId: parkingId,
				animation: google.maps.Animation.DROP
			});
			marker.addListener("click", that.clickMarker);
			that.markers.push(marker);
		}, timeout);
	};

	Map.prototype.clickMarker = function () {
		// .html >> sobresecribe ant
		console.log("bueno");
	}

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