// S‰‰tietojen kontrolleri.
angular.module("SaatietoApp").controller("SaatietoCtrl", function($scope, $http, RestFactory, DateService, FilterService){
	 
	 $scope.haeOtsikot = function()
	 {
		var otsikkoLupaus = RestFactory.haeOtsikot();
		otsikkoLupaus.then(function(response){
			$scope.otsikot = response;
			//console.log("Haku tehty!", response);
		}, function(error){
			console.log("OtsikkoHaku Error: ", error);
		});
	 };
	 
	 $scope.haeSaatiedot = function()
	 {
		var filters =
		{
			// TODO Yhdist‰ FilterServiceen.
			
			// Rajaa hakua p‰iv‰m‰‰rill‰ (aloitus ja lopetus).
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
		
		// L‰hetet‰‰n s‰‰nhakupyyntˆ annetuilla parametreill‰:
		var saatietoLupaus = RestFactory.haeSaatiedot(filters);
		
		saatietoLupaus.then(function(response){
			$scope.saatiedot = response;
			//console.log("Haku tehty!", response);
		}, function(error){
			console.log("SaatiedotHae Error: ", error);
		});
		
	 };
	 
	 // ng-repeat otsikko ja saatiedot tulostus.
	 $scope.haeOtsikot();
	 $scope.haeSaatiedot();

 });