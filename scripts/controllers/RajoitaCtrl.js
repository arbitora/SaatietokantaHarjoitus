// Rajoita kontrolleri.
angular.module("SaatietoApp").controller("RajoitaCtrl", function($scope, $http, RestFactory, DateService, FilterService, $filter, $uibModal){
	
	// Muuntaa YYYY-MM-DD date objektiksi.
	$scope.DateStampTODate = function(dateStamp)
	{
		var year = "";
		var month = "";
		var day = "";
		var nextInput = 0;
		for (var i = 0; i < dateStamp.length; i++)
		{
			if (dateStamp[i] === '-')
			{
				nextInput++;
				i++;
			}
			if(nextInput === 0)
				year += dateStamp[i];
			else if(nextInput === 1)
				month += dateStamp[i];
			else if(nextInput === 2)
				day += dateStamp[i];

		}
		var newDate = new Date();
		newDate.setFullYear(year);
		newDate.setMonth(month-1);
		newDate.setDate(day);
		return newDate;
	};
	
	// Haetaan minimi ja maksimi päivämäärät tietokannasta.
	$scope.DateMinMax = function(){
		var pvmLupaus = RestFactory.haePvm();

		pvmLupaus.then(function(response){
			var tempMin = $scope.DateStampTODate(response[0].MINpvm);
			var tempMax = $scope.DateStampTODate(response[0].MAXpvm);
			$scope.minDate = response[0].MINpvm;
			$scope.maxDate = response[0].MAXpvm;
		}, function(error){
			console.log("DateCtrl Error: ", error);
		});
	};
	$scope.DateMinMax();
	$scope.alkpvm = DateService.valittu_minPVM;
	$scope.loppvm = DateService.valittu_maxPVM;	
	$scope.default_alkpvm = DateService.valittu_minPVM;
	$scope.default_loppvm = DateService.valittu_maxPVM;
	
	//$scope.alkpvm = $scope.DateStampTODate(DateService.valittu_minPVM);
	//$scope.loppvm = $scope.DateStampTODate(DateService.valittu_maxPVM);	
	//$scope.default_alkpvm = $scope.DateStampTODate(DateService.valittu_minPVM);
	//$scope.default_loppvm = $scope.DateStampTODate(DateService.valittu_maxPVM);


  
	
	$scope.filterSaaTietoja = function(){
	
		// TODO Tiedot filteristä palveluun.
		
		if ($scope.alkpvm < $scope.loppvm)
		{
			DateService.valittu_minPVM = $scope.alkpvm;
			DateService.valittu_maxPVM = $scope.loppvm;			
			//DateService.valittu_minPVM = $filter('date')($scope.alkpvm, 'yyyy-MM-dd');
			//DateService.valittu_maxPVM = $filter('date')($scope.loppvm, 'yyyy-MM-dd');
		}
		else
		{
			// Virhe viesti käyttäjälle.   
				   
			// Asetukset varoitukselle.
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
			
			console.log("Error: virheelliset päivämäärät", DateService.valittu_minPVM, " + " , DateService.valittu_maxPVM);
		};

		console.log("Min Rajoitus: ", DateService.valittu_minPVM);
		console.log("Max Rajoitus: ", DateService.valittu_maxPVM);
	};
	
	
});