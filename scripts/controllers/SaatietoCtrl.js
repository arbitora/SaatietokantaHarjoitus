// Säätietojen kontrolleri.
angular.module("SaatietoApp").controller("SaatietoCtrl", function($scope, $http, RestFactory, DateService){
	 
	 $scope.haeSaatiedot = function()
	 {
		var filters =
		{
			// Rajaa hakua päivämäärillä (aloitus ja lopetus).
			//alkpvm: DateService.valittu_minPVM, 
			//loppvm: DateService.valittu_maxPVM, 
			
			//minLampotila: $scope.minLampotila,
			//maxLampotila: $scope.maxLampotila,
			//lampotilaEhto: $scope.lampotilaEhto,

			//minTuulennopeus: $scope.minTuulennopeus,
			//maxTuulennopeus: $scope.maxTuulennopeus,

			//minSademaara: $scope.minSademaara,
			//maxSademaara: $scope.maxSademaara,
			"jarjestaja": "pvm",
			"jarjestys": "ASC"
		};
		
		// Lähetetään säänhakupyyntö annetuilla parametreillä:
		var saatietoLupaus = RestFactory.haeSaatiedot(filters);
		
		saatietoLupaus.then(function(response){
			$scope.saatiedot = response;
			console.log("Haku tehty!", response);
		}, function(error){
			console.log("SaatiedotHae Error: ", error);
		});
		
	 };
	 
	 // ng-repeat saatiedot tulostus.
	 $scope.haeSaatiedot();
	 
	 
	 $scope.haetSaaLaskelmat = function()
	 {
		var filters =
		{
			// Rajaa hakua päivämäärillä (aloitus ja lopetus).
			//alkpvm: DateService.valittu_minPVM, 
			//loppvm: DateService.valittu_maxPVM, 
			
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