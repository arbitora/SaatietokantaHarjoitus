// S‰‰tietojen kontrolleri.
angular.module("SaatietoApp").controller("SaatilastoCtrl", function($scope, $http, RestFactory, DateService, FilterService){
	 
	 
	 $scope.haetSaaLaskelmat = function()
	 {
		var filters =
		{
			// TODO Yhdist‰ FilterServiceen.
			
			// Rajaa hakua p‰iv‰m‰‰rill‰ (aloitus ja lopetus).
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
		
		// L‰hetet‰‰n s‰‰nhakupyyntˆ annetuilla parametreill‰:
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