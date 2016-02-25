
if (window.TwoparkApp === undefined) {
	window.TwoparkApp = {};
}

TwoparkApp.init = function () {
	console.log("twopark App is online!");
  var map1 = new TwoparkApp.Map();
	map1.getLocation.bind(map1)();
};

$(document).on("ready", TwoparkApp.init);