﻿// Single-Page-Application, vaihda sivun sisältö linkkien perusteella.
angular.module("SaatietoApp").config(function($routeProvider){
	// TODO Tee view sivustot, määrittele ne.
	$routeProvider.when("/saatiedot", {
		templateUrl: "views/saatiedot.html",
		controller: "SaatietoCtrl"
	}).when("/saatilastot", {
		templateUrl: "views/saatilastot.html",
		controller: "SaatilastoCtrl"
	}).when("/rajoita", {
		templateUrl: "views/rajoita.html",
		controller: "RajoitaCtrl"
	}).otherwise({
	redirectTo: "/saatiedot"
	});
	
});

// Pääsivun bodyController. Muuttaa sivun sisältää halutun alueen perusteella.
angular.module("SaatietoApp").controller("BodyCtrl", function($scope, $location, DateService, RestFactory, $window){
	
	$scope.isActive = function (viewLocation){
		var active = (viewLocation === $location.path());
		return active;
	};
	
	$scope.$back = function(){
		window.history.back();
	};
	
	// Haetaan päivätiedot palveluun.
	$scope.haePVM = function()
	{
		var pvmLupaus = RestFactory.haePvm();
		pvmLupaus.then(function(response){
			DateService.haettuMinPVM = response[0].MINpvm;
			DateService.haettuMaxPVM = response[0].MAXpvm;
			if (DateService.valittu_minPVM === null)
				DateService.valittu_minPVM = response[0].MINpvm;
			if (DateService.valittu_maxPVM === null)
				DateService.valittu_maxPVM = response[0].MAXpvm;
		}, function(error){
			console.log("PVM Haku Error: ", error);
		});
	};

	$scope.haePVM();	
});