// Rajoita kontrolleri.
angular.module("SaatietoApp").controller("RajoitaCtrl", function($scope, $http, RestFactory, DateService, DialogService, FilterService, $filter, $uibModal){

	// Nollausfunktiot.
	$scope.nollaaALKPVM = function()
	{
		$scope.alkpvm = null;
	};
	$scope.nollaaLOPPVM = function()
	{
		$scope.loppvm = null;
	};
	$scope.nollaaMinLampotila = function()
	{
		$scope.minLampotila = "";
	};
	$scope.nollaaMaxLampotila = function()
	{
		$scope.maxLampotila = "";
	};
	$scope.nollaaMinTuulennopeus = function()
	{
		$scope.minTuulennopeus = "";
	};
	$scope.nollaaMaxTuulennopeus = function()
	{
		$scope.maxTuulennopeus = "";
	};
	$scope.nollaaMinSademaara = function()
	{
		$scope.minSademaara = "";
	};
	$scope.nollaaMaxSademaara = function()
	{
		$scope.maxSademaara = "";	
	};	
	$scope.nollaaKaikki = function()
	{
		$scope.nollaaALKPVM();
		$scope.nollaaLOPPVM();
		$scope.nollaaMinLampotila();
		$scope.nollaaMaxLampotila();
		$scope.nollaaMinTuulennopeus();
		$scope.nollaaMaxTuulennopeus();
		$scope.nollaaMinSademaara();
		$scope.nollaaMaxSademaara();
		
		// Virhe viesti käyttäjälle.   
			DialogService.modalTitle = "Nollattu!"
			DialogService.errorMessage = "Kaikki kentät nollattu!<br>Paina 'Rajaa hakua' rajataksesi haku nollatuilla arvoilla.";
			DialogService.errorTitle = "Viesti";
			
			// Asetukset varoitukselle ja avaa modal Ikkuna.
			var modalInstance = $uibModal.open({
				  animation: false,
				  templateUrl: 'views/error.html',
				  controller: 'DialogCtrl',
				  size: 'sm'
			});

			modalInstance.result.then(function () {
				// Nappaa paluu arvot täältä.
				}, function () {
				// Log funktio esim.
				});
	};
	
	// Päivämäärän formaatti.
	$scope.format = "yyyy-MM-dd";
	 	
	$scope.today = function() {
		$scope.alkpvm = new Date();
		$scope.loppvm = new Date();
	};
	$scope.today();
	
	
	// Modal ikkuna asetukset päivämäärä valitsimesta. Avaa ja sulkee ikkunan.
	$scope.openPicker = function(x) {
		if (x === 1)
			$scope.popup_alkpvm.opened = true;
		else
			$scope.popup_loppvm.opened = true;
	};
	
	$scope.popup_alkpvm = {
		opened: false
	};
	
	$scope.popup_loppvm = {
		opened: false
	};
	
	// Haetaan minimi ja maksimi päivämäärät tietokannasta.
	$scope.DateMinMax = function(){
		var pvmLupaus = RestFactory.haePvm();

		pvmLupaus.then(function(response){
			var tempMin = DateService.DateStampTODate(response[0].MINpvm);
			var tempMax = DateService.DateStampTODate(response[0].MAXpvm);
			
			// Asettaa asetukset päivämäärä valitsimeen.
			$scope.dateOptions = {
			formatYear: 'yyyy',
			maxDate: tempMin,
			minDate: tempMax,
			startingDay: 1
		  };
		}, function(error){
			console.log("DateCtrl Error: ", error);
		});
	};
	
	$scope.DateMinMax();

	// Asetetaan oletus päivämäärät valitsimiin.
	if (DateService.valittu_minPVM != null || DateService.valittu_minPVM != "undefined")
	{
		$scope.alkpvm = DateService.DateStampTODate(DateService.valittu_minPVM);
		$scope.loppvm = DateService.DateStampTODate(DateService.valittu_maxPVM);	
	}
	else
	{
		$scope.alkpvm = null;
		$scope.loppvm = null;
	}
		

	$scope.filterSaaTietoja = function(validForm){
	
		var check = 0;
		// Tarkistetaan onko päivämäärät oikein. 
		if ($scope.alkpvm < $scope.loppvm || $scope.alkpvm === null || $scope.loppvm === null)
		{
			// Tarkistetaan lämpötilojen oikeus.
			if ($scope.minLampotila > $scope.maxLampotila || $scope.minLampotila === "" || $scope.maxLampotila === "")
			{
				// Tarkistetaan tuulennopeuksien oikeus.
				if ($scope.minTuulennopeus > $scope.maxTuulennopeus || $scope.minTuulennopeus === "" || $scope.maxTuulennopeus === "")
				{
					// Tarkistetaan sademäärän oikeus.
					if ($scope.minSademaara > $scope.maxSademaara || $scope.minSademaara === "" || $scope.maxSademaara === "")
					{
						DateService.valittu_minPVM = $filter('date')($scope.alkpvm, 'yyyy-MM-dd');
						DateService.valittu_maxPVM = $filter('date')($scope.loppvm, 'yyyy-MM-dd');
						FilterService.minLampotila = $scope.minLampotila;
						FilterService.maxLampotila = $scope.maxLampotila;
						FilterService.minTuulennopeus = $scope.minTuulennopeus;
						FilterService.maxTuulennopeus = $scope.maxTuulennopeus;
						FilterService.minSademaara = $scope.minSademaara;
						FilterService.maxSademaara = $scope.maxSademaara;
					}
					else
						check++;
				}
				else
					check++;
			}
			else
				check++;
		}
		else
			check++;
		
		if (check >= 1)
		{
			// Virhe viesti käyttäjälle.   
			DialogService.modalTitle = "VIRHE!";
			DialogService.errorMessage = "Virheellinen syöte!";
			DialogService.errorTitle = "";
			
			if($scope.alkpvm > $scope.loppvm)
				errorMessage += "Aloitus päivämäärä on myöhäisempi kuin lopetus päivämäärä.<br>";
			if ($scope.minLampotila > $scope.maxLampotila)
				errorMessage += "Minimi lämpötila on suurempi kuin maksimi lämpötila.<br>";				
			if ($scope.minTuulennopeus > $scope.maxTuulennopeus)
				errorMessage += "Minimi tuulennopeus on suurempi kuin maksimi lämpötila.<br>";						   
			if ($scope.minSademaara > $scope.maxSademaara)
				errorMessage += "Minimi sademäärä on suurempi kuin maksimi lämpötila.<br>";
			
			// Asetukset varoitukselle ja avaa modal Ikkuna.
			var modalInstance = $uibModal.open({
				  animation: false,
				  templateUrl: 'views/error.html',
				  controller: 'DialogCtrl',
				  size: 'sm'
			});

			modalInstance.result.then(function () {
				// Nappaa paluu arvot täältä.
				}, function () {
				// Log funktio esim.
				});
			
		}

		console.log(FilterService);
	};
	
	
});