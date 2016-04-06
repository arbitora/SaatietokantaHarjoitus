// Säätietojen kontrolleri.
angular.module("SaatietoApp").controller("SaatilastoCtrl", function($scope, $http, RestFactory, DateService, FilterService){

	 
	 $scope.haetSaaLaskelmat = function()
	 {
		var filters =
		{
			// TODO Yhdistä FilterServiceen.
			
			// Rajaa hakua päivämäärillä (aloitus ja lopetus).
			"alkpvm": DateService.valittu_minPVM, 
			"loppvm": DateService.valittu_maxPVM, 
			
			"minLampotila": FilterService.minLampotila,
			"maxLampotila": FilterService.maxLampotila,

			"minTuulennopeus": FilterService.minTuulennopeus,
			"maxTuulennopeus": FilterService.maxTuulennopeus,

			"minSademaara": FilterService.minSademaara,
			"maxSademaara": FilterService.maxSademaara
		};
		//console.log("Filters JSON: ", filters);
		// Lähetetään säänhakupyyntö annetuilla parametreillä:
		var saatilastoLupaus = RestFactory.haeSaatilastot(filters);
		
		saatilastoLupaus.then(function(response){
			$scope.saatilasto = response[0];
			//console.log("Haku tehty!", response);
		}, function(error){
			console.log("SaaLaskutHae Error: ", error);
		});
		
	 };

	 // tulostaa tietoja MAX MIN AVG -taulukkoon
	 $scope.haetSaaLaskelmat();
	 
	 
	if (DateService.valittu_minPVM != null && DateService.valittu_maxPVM != null
	&& DateService.valittu_minPVM != "" && DateService.valittu_maxPVM != "")
		$scope.aikavali = "Tilastot aikaväliltä " + DateService.valittu_minPVM + " - " + DateService.valittu_maxPVM;
	else if (DateService.valittu_minPVM != null && DateService.valittu_minPVM != "")
		$scope.aikavali = "Tilastot aikaväliltä " + DateService.valittu_minPVM +" - ";
	else if (DateService.valittu_maxPVM != null && DateService.valittu_maxPVM != "")
		$scope.aikavali = "Tilastot aikaväliltä - " + DateService.valittu_maxPVM;
	 
 });