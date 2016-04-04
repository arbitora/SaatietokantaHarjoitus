// Single-Page-Application, vaihda sivun sis�lt� linkkien perusteella.
angular.module("SaatietoApp").config(function($routeProvider){
	// TODO Tee view sivustot, m��rittele ne.
	$routeProvider.when("/main", {
		templateUrl: "views/main.html",
		controller: "SaatietoCtrl"
	}).otherwise({
	redirectTo: "/main"
	});
	
});

// P��sivun bodyController. Muuttaa sivun sis�lt�� halutun alueen perusteella.
angular.module("SaatietoApp").controller("BodyCtrl", function($scope, $location){
	
	$scope.isActive = function (viewLocation){
		var active = (viewLocation === $location.path());
		return active;
	};
});