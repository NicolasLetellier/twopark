
if (window.TwoparkApp === undefined) {
	window.TwoparkApp = {};
}

TwoparkApp.init = function () {
	console.log("twopark App is online!");
  var map1 = new TwoparkApp.Map();
	map1.getLocation.bind(map1)();
	map1.clickSearch.bind(map1)();
	var anim1 = new TwoparkApp.Anim();
	anim1.hideFlashMessage.bind(anim1)();
};

$(document).on("ready", TwoparkApp.init);