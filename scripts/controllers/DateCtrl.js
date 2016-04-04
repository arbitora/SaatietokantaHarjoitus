// P‰iv‰m‰‰r‰ valitsimen p‰iv‰m‰‰r‰n s‰‰tˆ.
// minDate ja maxDate funktiot rajoittavat valittavat p‰iv‰m‰‰r‰t.
angular.module("SaatietoApp").controller("DateCtrl", function($scope, RestFactory, DateService) {
	$scope.myDate = new Date(); // Valittu p‰iv‰m‰‰r‰.
	DateService.valittu_minPVM = $scope.myDate
	// Haetaan minimi ja maksimi p‰iv‰m‰‰r‰t tietokannasta.
	$scope.DateMinMax = function(){
		var pvmLupaus = RestFactory.haePvm();

		pvmLupaus.then(function(response){
			$scope.minDate = new Date(response.MINpvm);
			$scope.maxDate = new Date(response.MAXpvm);
			console.log("PVM haettu!", response);
		}, function(error){
			console.log("DateCtrl Error: ", error);
		});
	};
  
});