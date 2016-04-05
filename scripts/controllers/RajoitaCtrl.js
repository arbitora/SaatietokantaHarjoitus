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
			DialogService.errorMessage = "Kaikki kentät nollattu!\nPaina 'Rajaa hakua' rajataksesi haku nollatuilla arvoilla.";
			DialogService.errorTitle = "Viesti:";
			
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
		
	// Formatoi inputit tai anna niille edelliset arvot.
	if (angular.isDefined(FilterService.minLampotila))
		$scope.minLampotila = FilterService.minLampotila;
	else
		$scope.nollaaMinLampotila();
	if (angular.isDefined(FilterService.maxLampotila))
		$scope.maxLampotila = FilterService.maxLampotila;
	else
		$scope.nollaaMaxLampotila();		
	if (angular.isDefined(FilterService.minTuulennopeus))
		$scope.minTuulennopeus = FilterService.minTuulennopeus;
	else
		$scope.nollaaMinTuulennopeus();
	if (angular.isDefined(FilterService.maxTuulennopeus))
		$scope.maxTuulennopeus = FilterService.maxTuulennopeus;
	else
		$scope.nollaaMaxTuulennopeus();
	if (angular.isDefined(FilterService.minSademaara))
		$scope.minSademaara = FilterService.minSademaara;
	else
		$scope.nollaaMinSademaara();
	if (angular.isDefined(FilterService.maxSademaara))
		$scope.maxSademaara = FilterService.maxSademaara;
	else
		$scope.nollaaMaxSademaara();

	
	$scope.filterSaaTietoja = function(validForm){
	
		var check = 0;
		console.log("$minLampotila: ", $scope.minLampotila);
		// Tarkistetaan onko päivämäärät oikein. 
		if ($scope.alkpvm < $scope.loppvm || $scope.alkpvm === null || $scope.loppvm === null)
		{
			// Tarkistetaan lämpötilojen oikeus.
			if ($scope.minLampotila < $scope.maxLampotila
			|| $scope.minLampotila === "" && angular.isDefined($scope.minLampotila)
			|| $scope.maxLampotila === "" && angular.isDefined($scope.minLampotila))
			{
				// Tarkistetaan tuulennopeuksien oikeus.
				if ($scope.minTuulennopeus >= 0 && $scope.maxTuulennopeus >= 0
				&& ($scope.minTuulennopeus < $scope.maxTuulennopeus 
				|| $scope.minTuulennopeus === "" && angular.isDefined($scope.minTuulennopeus)
				|| $scope.maxTuulennopeus === "" && angular.isDefined($scope.maxTuulennopeus)))
				{
					// Tarkistetaan sademäärän oikeus.
					if ($scope.minSademaara >= 0 && $scope.maxSademaara >= 0
					&& ($scope.minSademaara < $scope.maxSademaara 
					|| $scope.minSademaara === "" && angular.isDefined($scope.minSademaara)
					|| $scope.maxSademaara === "" && angular.isDefined($scope.maxSademaara)))
					{
						DateService.valittu_minPVM = $filter('date')($scope.alkpvm, 'yyyy-MM-dd');
						DateService.valittu_maxPVM = $filter('date')($scope.loppvm, 'yyyy-MM-dd');
						FilterService.minLampotila = $scope.minLampotila;
						FilterService.maxLampotila = $scope.maxLampotila;
						FilterService.minTuulennopeus = $scope.minTuulennopeus;
						FilterService.maxTuulennopeus = $scope.maxTuulennopeus;
						FilterService.minSademaara = $scope.minSademaara;
						FilterService.maxSademaara = $scope.maxSademaara;
						
						DialogService.modalTitle = "Rajaukset syötetty!";
						DialogService.errorMessage = "Klikkaa Säätiedot tai Säätilastot painiketta nähdäksesi uudet tulokset näillä asetuksilla.";
						DialogService.errorTitle = "Uudet etsintä parametrit syötetty.";
						var modalInstance = $uibModal.open({
						  animation: false,
						  templateUrl: 'views/error.html',
						  controller: 'DialogCtrl',
						  size: ''
						});

						modalInstance.result.then(function () {
							// Nappaa paluu arvot täältä.
							}, function () {
							// Log funktio esim.
						});
						
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
			DialogService.errorMessage = "";
			DialogService.errorTitle = "Virheellinen syöte:";
			
			if($scope.alkpvm > $scope.loppvm)
				DialogService.errorMessage += "Aloitus päivämäärä on myöhäisempi kuin lopetus päivämäärä.\n";
			if (angular.isUndefined($scope.alkpvm) || angular.isUndefined($scope.loppvm))
				DialogService.errorMessage += "Päivämäärä on syötetty väärin. Tarkista syöttö.\n";
			if (angular.isUndefined($scope.minLampotila) || angular.isUndefined($scope.maxLampotila))
				DialogService.errorMessage += "Lämpötila on syötetty väärin. Käytä vain numeroita.\nPaina 'Poista rajaus' -painiketta syötön poistamiseksi.";		
			if ($scope.minLampotila > $scope.maxLampotila)
				DialogService.errorMessage += "Minimi lämpötila on suurempi kuin maksimi lämpötila.\n";	
			if (angular.isUndefined($scope.minTuulennopeus) || angular.isUndefined($scope.maxTuulennopeus))
				DialogService.errorMessage += "Tuulennopeus on syötetty väärin. Arvon pitää olla 0 tai suurempi.\nPaina 'Poista rajaus' -painiketta syötön poistamiseksi.";				
			if ($scope.minTuulennopeus > $scope.maxTuulennopeus)
				DialogService.errorMessage += "Minimi tuulennopeus on suurempi kuin maksimi lämpötila.\n";	
			if (angular.isUndefined($scope.minSademaara) || angular.isUndefined($scope.maxSademaara))
				DialogService.errorMessage += "Sademäärä on syötetty väärin. Arvon pitää olla 0 tai suurempi.\nPaina 'Poista rajaus' -painiketta syötön poistamiseksi.";				
			if ($scope.minSademaara > $scope.maxSademaara)
				DialogService.errorMessage += "Minimi sademäärä on suurempi kuin maksimi lämpötila.\n";
			
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