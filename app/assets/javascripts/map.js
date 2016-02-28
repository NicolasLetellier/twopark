
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
		var loggedIn = $("body").attr("data-logged");
		if (loggedIn) {
			var url = "/parkings.json";
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

	Map.prototype.dropMarkers = function (parkingsJson) {
		this.clearMarkers();
		// add all parkings objects to an array
		for (var i = 0; i < parkingsJson.show_parking.length; i++) {
			if (parkingsJson.show_parking[i].available) {
				var position = {lat: parseFloat(parkingsJson.show_parking[i].lat), lng: parseFloat(parkingsJson.show_parking[i].long)};
				var title = parkingsJson.show_parking[i].title;
				var parkingId = parkingsJson.show_parking[i].id;
				this.createMarkersWithTimeout(position, title, parkingId, i*80);
			}
		};
	};

	Map.prototype.createMarkersWithTimeout = function (position, title, parkingId, timeout) {
		var that = this;
		var url = "";
		switch (parkingId % 5) {
			case 0:
				url = "http://www.perso.nicolasletellier.com/twopark/markertwoparkfull.png";
				break;
			case 1:
				url = "http://www.perso.nicolasletellier.com/twopark/markertwoparkgris.png";
				break;
			case 2:
				url = "http://www.perso.nicolasletellier.com/twopark/markerorange.png";
				break;
			case 3:
				url = "http://www.perso.nicolasletellier.com/twopark/markerjaune.png";
				break;
			case 4:
				url = "http://www.perso.nicolasletellier.com/twopark/markervert.png";
				break;
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