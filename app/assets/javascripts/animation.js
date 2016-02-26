(function(){

	var Anim = window.TwoparkApp.Anim = function () {
	};

	Anim.prototype.hideFlashMessage = function () {
		$(".alert").delay(3000).slideUp(400);
	};

})();