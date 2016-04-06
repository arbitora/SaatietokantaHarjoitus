// Rajoita kontrolleri.
angular.module("SaatietoApp").controller("RajoitaCtrl", function($scope, $http, RestFactory, DateService, DialogService, FilterService, FunktioService, $filter, $uibModal){

	$scope.alkPVMdisable = DateService.minPVM_disabled;
	$scope.lopPVMdisable = DateService.maxPVM_disabled;
	$scope.minLampotilaDisable = FilterService.minLampotila_disabled;
	$scope.maxLampotilaDisable = FilterService.maxLampotila_disabled;
	$scope.minTuulennopeusDisable = FilterService.minTuulennopeus_disabled;
	$scope.maxTuulennopeusDisable = FilterService.maxTuulennopeus_disabled;
	$scope.minSademaaraDisable = FilterService.minSademaara_disabled;
	$scope.maxSademaaraDisable = FilterService.maxSademaara_disabled;
	
	// Funktiot joilla rajajuksia voidaan syöttää, enabloi ne.
	$scope.lisaaALKPVM = function()
	{
		$scope.alkPVMdisable = false;
		if (DateService.haettuMinPVM != null && DateService.valittu_minPVM === null)
			DateService.valittu_minPVM = DateService.haettuMinPVM;
		$scope.alkpvm = DateService.DateStampTODate(DateService.valittu_minPVM);
	};	
	$scope.lisaaLOPPVM = function()
	{
		$scope.lopPVMdisable = false;
		if (DateService.haettuMaxPVM != null && DateService.valittu_maxPVM === null)
			DateService.valittu_maxPVM = DateService.haettuMaxPVM;
		$scope.loppvm = DateService.DateStampTODate(DateService.valittu_maxPVM);	
	};	
	$scope.lisaaMinLampotila = function()
	{
		$scope.minLampotilaDisable = false;
		
	};
	$scope.lisaaMaxLampotila = function()
	{
		$scope.maxLampotilaDisable = false;
		
	};
	$scope.lisaaMinTuulennopeus = function()
	{
		$scope.minTuulennopeusDisable = false;
		
	};
	$scope.lisaaMaxTuulennopeus = function()
	{
		$scope.maxTuulennopeusDisable = false;
		
	};	
	$scope.lisaaMinSademaara = function()
	{
		$scope.minSademaaraDisable = false;
		
	};
	$scope.lisaaMaxSademaara = function()
	{
		$scope.maxSademaaraDisable = false;
		
	};		
	// Nollausfunktiot.
	$scope.nollaaALKPVM = function()
	{
		$scope.alkPVMdisable = true;
		$scope.alkpvm = null;
	};
	$scope.nollaaLOPPVM = function()
	{
		$scope.lopPVMdisable = true;
		$scope.loppvm = null;
	};
	$scope.nollaaMinLampotila = function()
	{
		$scope.minLampotila = "";
		$scope.minLampotilaDisable = true;
	};
	$scope.nollaaMaxLampotila = function()
	{
		$scope.maxLampotila = "";
		$scope.maxLampotilaDisable = true;

	};
	$scope.nollaaMinTuulennopeus = function()
	{
		$scope.minTuulennopeus = "";
		$scope.minTuulennopeusDisable = true;

	};
	$scope.nollaaMaxTuulennopeus = function()
	{
		$scope.maxTuulennopeus = "";
		$scope.maxTuulennopeusDisable = true;
	};
	$scope.nollaaMinSademaara = function()
	{
		$scope.minSademaara = "";
		$scope.minSademaaraDisable = true;
	};
	$scope.nollaaMaxSademaara = function()
	{
		$scope.maxSademaara = "";
		$scope.maxSademaaraDisable = true;
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

		$scope.filterSaaTietoja(true);

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
			maxDate: tempMax,
			minDate: tempMin,
			startingDay: 1
		  };
		}, function(error){
			console.log("RajoitaCtrl DateMinMax() Error: ", error);
		});
	};
	
	$scope.DateMinMax();

	
	// Asetetaan oletus arvot kaikille laatikoille mikäli ne ovat päällä.
	if (DateService.minPVM_disabled === false)
		$scope.alkpvm = DateService.DateStampTODate(DateService.valittu_minPVM);
	else
		$scope.alkpvm = null;
	
	if (DateService.maxPVM_disabled === false)
		$scope.loppvm = DateService.DateStampTODate(DateService.valittu_maxPVM);
	else
		$scope.loppvm = null;
	
	// Formatoi inputit tai anna niille edelliset arvot.
	if (angular.isDefined(FilterService.minLampotila) && FilterService.minLampotila_disabled === false)
		$scope.minLampotila = FilterService.minLampotila;
	else
		$scope.nollaaMinLampotila();
	if (angular.isDefined(FilterService.maxLampotila) && FilterService.maxLampotila_disabled === false)
		$scope.maxLampotila = FilterService.maxLampotila;
	else
		$scope.nollaaMaxLampotila();		
	if (angular.isDefined(FilterService.minTuulennopeus) && FilterService.minTuulennopeus_disabled === false)
		$scope.minTuulennopeus = FilterService.minTuulennopeus;
	else
		$scope.nollaaMinTuulennopeus();
	if (angular.isDefined(FilterService.maxTuulennopeus) && FilterService.maxTuulennopeus_disabled === false)
		$scope.maxTuulennopeus = FilterService.maxTuulennopeus;
	else
		$scope.nollaaMaxTuulennopeus();
	if (angular.isDefined(FilterService.minSademaara) && FilterService.minSademaara_disabled === false)
		$scope.minSademaara = FilterService.minSademaara;
	else
		$scope.nollaaMinSademaara();
	if (angular.isDefined(FilterService.maxSademaara) && FilterService.maxSademaara_disabled === false)
		$scope.maxSademaara = FilterService.maxSademaara;
	else
		$scope.nollaaMaxSademaara();

	
	$scope.filterSaaTietoja = function(nollattu){
	
		var check = 0;

		// Tarkistetaan onko päivämäärät oikein ja onko päivämäärää syötetty lainkaan.
		if (FunktioService.areDatesValid($scope.alkpvm, $scope.loppvm, $scope.alkPVMdisable, $scope.lopPVMdisable))
		{
			// Tarkistetaan lämpötilojen oikeus.
			if (FunktioService.areEntriesValid($scope.minLampotila, $scope.maxLampotila, $scope.minLampotilaDisable, $scope.maxLampotilaDisable))
			{
				// Tarkistetaan tuulennopeuksien oikeus.
				if ($scope.minTuulennopeus >= 0 && $scope.maxTuulennopeus >= 0
				&& FunktioService.areEntriesValid($scope.minTuulennopeus, $scope.maxTuulennopeus, $scope.minTuulennopeusDisable, $scope.maxTuulennopeusDisable))
				{
					// Tarkistetaan sademäärän oikeus.
					if ($scope.minSademaara >= 0 && $scope.maxSademaara >= 0
					&& FunktioService.areEntriesValid($scope.minSademaara, $scope.maxSademaara, $scope.minSademaaraDisable, $scope.maxSademaaraDisable))
					{
						// Viedään datat palveluihin.
						DateService.valittu_minPVM = $filter('date')($scope.alkpvm, 'yyyy-MM-dd');
						DateService.valittu_maxPVM = $filter('date')($scope.loppvm, 'yyyy-MM-dd');
						FilterService.minLampotila = $scope.minLampotila;
						FilterService.maxLampotila = $scope.maxLampotila;
						FilterService.minTuulennopeus = $scope.minTuulennopeus;
						FilterService.maxTuulennopeus = $scope.maxTuulennopeus;
						FilterService.minSademaara = $scope.minSademaara;
						FilterService.maxSademaara = $scope.maxSademaara;
						
						// Viedään enable/disable data palveluihin.
						DateService.minPVM_disabled = $scope.alkPVMdisable;
						DateService.maxPVM_disabled = $scope.lopPVMdisable;

						FilterService.minLampotila_disabled = $scope.minLampotilaDisable;
						FilterService.maxLampotila_disabled = $scope.maxLampotilaDisable;
						FilterService.minTuulennopeus_disabled = $scope.minTuulennopeusDisable;
						FilterService.maxTuulennopeus_disabled = $scope.maxTuulennopeusDisable;
						FilterService.minSademaara_disabled = $scope.minSademaaraDisable;
						FilterService.maxSademaara_disabled = $scope.maxSademaaraDisable;
						
						console.log(DateService);
						console.log(FilterService);
						if (nollattu === true){
							DialogService.errorMessage = "Klikkaa Säätiedot tai Säätilastot painiketta nähdäksesi tulokset nollatuilla asetuksilla.";
							DialogService.errorTitle = "Nollatut etsintä parametrit syötetty.";
						}
						else{
							DialogService.errorMessage = "Klikkaa Säätiedot tai Säätilastot painiketta nähdäksesi uudet tulokset näillä asetuksilla.";
							DialogService.errorTitle = "Uudet etsintä parametrit syötetty.";	
						}
						
						DialogService.modalTitle = "Rajaukset syötetty!"
						var modalInstance = $uibModal.open({
							  animation: false,
							  templateUrl: 'views/error.html',
							  controller: 'DialogCtrl',
							  size: ''
							});
						modalInstance.result.then(function () {
							// Resolve here
							}, function () {
							// Log funktio esim.
						});
						
					}
					else
						check = 4;
				}
				else
					check = 3;
			}
			else
				check = 2;
		}
		else
			check = 1;
		
		if (check >= 1)
		{
			// Virhe viesti käyttäjälle.
			DialogService.modalTitle = "VIRHE!";
			DialogService.errorMessage = "";
			DialogService.errorTitle = "Virheellinen syöte:";
			
			if ($scope.alkpvm > $scope.loppvm && angular.isDefined($scope.alkpvm) && angular.isDefined($scope.loppvm)
				&& $scope.alkpvm != null && $scope.loppvm != null)
				DialogService.errorMessage += "Aloitus päivämäärä on myöhäisempi kuin lopetus päivämäärä.\n";
			if (angular.isUndefined($scope.alkpvm) || angular.isUndefined($scope.loppvm)
				|| $scope.alkpvm === null && $scope.alkPVMdisable === false
				|| $scope.loppvm === null && $scope.lopPVMdisable === false)
				DialogService.errorMessage += "Päivämäärä on syötetty väärin. Tarkista syöttö tai poista rajaus.\n";
			if (check === 2)
				DialogService.errorMessage += "Lämpötila on syötetty väärin. Käytä vain numeroita.\nPaina 'Poista rajaus' -painiketta syötön poistamiseksi.";		
			if ($scope.minLampotila > $scope.maxLampotila &&
			!FunktioService.isEmpty($scope.minLampotila) && !FunktioService.isEmpty($scope.maxLampotila))
				DialogService.errorMessage += "Minimi lämpötila on suurempi kuin maksimi lämpötila.\n";	
			if (check === 3)
				DialogService.errorMessage += "Tuulennopeus on syötetty väärin. Arvon pitää olla 0 tai suurempi.\nPaina 'Poista rajaus' -painiketta syötön poistamiseksi.";				
			if ($scope.minTuulennopeus > $scope.maxTuulennopeus &&
			!FunktioService.isEmpty($scope.minTuulennopeus) && !FunktioService.isEmpty($scope.maxTuulennopeus))
				DialogService.errorMessage += "Minimi tuulennopeus on suurempi kuin maksimi lämpötila.\n";	
			if (check === 4)
				DialogService.errorMessage += "Sademäärä on syötetty väärin. Arvon pitää olla 0 tai suurempi.\nPaina 'Poista rajaus' -painiketta syötön poistamiseksi.";				
			if ($scope.minSademaara > $scope.maxSademaara &&
			!FunktioService.isEmpty($scope.minSademaara) && !FunktioService.isEmpty($scope.maxSademaara))
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
		console.log("DateService: ", DateService);
		console.log("FilterService: ", FilterService);
	};
	
	
});