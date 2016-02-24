
if (window.TwoparkApp === undefined) {
	window.TwoparkApp = {};
}

TwoparkApp.init = function () {
	console.log("twopark App is online!");

	if ("geolocation" in navigator) {
	  var map1 = new TwoparkApp.Map();
		map1.getLocation.bind(map1)();
	} else {
	  alert("Geolocation is not available")
	}

};

$(document).on("ready", TwoparkApp.init);