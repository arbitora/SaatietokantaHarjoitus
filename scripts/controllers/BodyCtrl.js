// Single-Page-Application, vaihda sivun sisältö linkkien perusteella.
angular.module("SaatietoApp").config(function($routeProvider){
	// TODO Tee view sivustot, määrittele ne.
	$routeProvider.when("/saatiedot", {
		templateUrl: "views/saatiedot.html",
		controller: "SaatietoCtrl"
	}).when("/saatilastot", {
		templateUrl: "views/saatilastot.html",
		controller: "SaatilastoCtrl"
	}).otherwise({
	redirectTo: "/saatiedot"
	});
	
});

// Pääsivun bodyController. Muuttaa sivun sisältöä halutun alueen perusteella.
angular.module("SaatietoApp").controller("BodyCtrl", function($scope, $location){
	
	$scope.isActive = function (viewLocation){
		var active = (viewLocation === $location.path());
		return active;
	};
	
	$scope.filterSaaTietoja = function(){
	
		// TODO Modal auki.
		// TODO Modalista otetaan uudet tiedot filteriin.
	};
	
});