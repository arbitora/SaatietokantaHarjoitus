// Säätietojen kontrolleri.
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
			// TODO Yhdistä FilterServiceen.
			
			// Rajaa hakua päivämäärillä (aloitus ja lopetus).
			"alkpvm": DateService.valittu_minPVM, 
			"loppvm": DateService.valittu_maxPVM, 
			
			//"minLampotila": FilterService.minLampotila,
			//"maxLampotila": FilterService.maxLampotila,
			//"lampotilaEhto": FilterService.lampotilaEhto,

			//"minTuulennopeus": FilterService.minTuulennopeus,
			//"maxTuulennopeus": FilterService.maxTuulennopeus,

			//"minSademaara": FilterService.minSademaara,
			//"maxSademaara": FilterService.maxSademaara,
			"jarjestaja": FilterService.jarjestaja,
			"jarjestys": FilterService.jarjestys
		};
		console.log("Filters JSON: ", filters);
		// Lähetetään säänhakupyyntö annetuilla parametreillä:
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
	 
	 // Muuttaa taulukon järjestyksen.
	 $scope.sortBy = function(clickedOtsikko)
	 {
		 console.log("Klikattu otsikko: ", clickedOtsikko);
		 // Tarkistaa aluksi onko klikattu otsikko sama kuin viimeksi klikattu.
		 if (clickedOtsikko === FilterService.jarjestaja)
		 {
			 // Muutetaan vain järjestystä, jos ASC -> DESC tai jos DESC -> ASC.
			 if (FilterService.jarjestys === "ASC")
				 FilterService.jarjestys = "DESC";
			 else
				 FilterService.jarjestys = "ASC";
		 }
		 else
		 {
			 // Jos klikattu otsikko ei sama kuin viimeksi, asetetaan se uudeksi järjestäjäksi
			 // ja järjestykseksi ASC.
			FilterService.jarjestaja = clickedOtsikko;
			FilterService.jarjestys = "ASC";			 
		 }
		 
		 // Kutsutaan tiedot uudestaan uusilla järjestyksillä.
		$scope.haeSaatiedot();
	 };

 });