// Single-Page-Application, vaihda sivun sisältö linkkien perusteella.
angular.module("SaatietoApp").config(function($routeProvider){
	// TODO Tee view sivustot, määrittele ne.
	$routeProvider.when("/main", {
		templateUrl: "views/main.html",
		controller: "SaatietoCtrl"
	}).otherwise({
	redirectTo: "/main"
	});
	
});

// Pääsivun bodyController. Muuttaa sivun sisältöä halutun alueen perusteella.
angular.module("SaatietoApp").controller("BodyCtrl", function($scope, $location){
	
	$scope.isActive = function (viewLocation){
		var active = (viewLocation === $location.path());
		return active;
	};
});