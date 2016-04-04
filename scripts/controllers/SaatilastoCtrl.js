// Säätietojen kontrolleri.
angular.module("SaatietoApp").controller("SaatilastoCtrl", function($scope, $http, RestFactory, DateService, FilterService){
	 
	 
	 $scope.haetSaaLaskelmat = function()
	 {
		var filters =
		{
			// TODO Yhdistä FilterServiceen.
			
			// Rajaa hakua päivämäärillä (aloitus ja lopetus).
			alkpvm: DateService.valittu_minPVM, 
			loppvm: DateService.valittu_maxPVM, 
			
			//minLampotila: $scope.minLampotila,
			//maxLampotila: $scope.maxLampotila,
			//lampotilaEhto: $scope.lampotilaEhto,

			//minTuulennopeus: $scope.minTuulennopeus,
			//maxTuulennopeus: $scope.maxTuulennopeus,

			//minSademaara: $scope.minSademaara,
			//maxSademaara: $scope.maxSademaara,
		};
		
		// Lähetetään säänhakupyyntö annetuilla parametreillä:
		var saatilastoLupaus = RestFactory.haeSaatilastot(filters);
		
		saatilastoLupaus.then(function(response){
			$scope.saatilasto = response;
			console.log("Haku tehty!", response);
		}, function(error){
			console.log("SaaLaskutHae Error: ", error);
		});
		
	 };
	  
	 // tulostaa tietoja MAX MIN AVG -taulukkoon
	 $scope.haetSaaLaskelmat();
	 
 });