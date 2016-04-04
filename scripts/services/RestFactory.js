angular.module("SaatietoApp").factory("RestFactory", function($http, $q){
	var SaatiedotObject = {};
	
	// Hakee tietokannassa olevat valittavat p‰iv‰m‰‰r‰t.
	SaatiedotObject.haePvm = function()
	{
		var deferred = $q.defer();
		var softURL = "slim_api/index.php/dates";
		$http.get(softURL).then(function(response){
			deferred.resolve(response.data.data)
		}, function(err){
				deferred.reject("Error: " + err.data);
		});
		return deferred.promise;
	};
	
	// Hakee tietokannasta kaikki otsikot, joilla tiedot voidaan j‰rjest‰‰.
	SaatiedotObject.haeOtsikot = function()
	{
		var deferred = $q.defer();
		var softURL = "slim_api/index.php/headers";
		$http.get(softURL).then(function(response){
			deferred.resolve(response.data.data)
		}, function(err){
				deferred.reject("Error: " + err.data);
		});
		return deferred.promise;
	};
	
	// filters sis‰lt‰‰ s‰‰tieto haun rajaukset.
	// Lis‰ tietoja rajauksesta ja sen rakenteesta lyˆtyy JSON_rajaus.js -tiedostosta.
	SaatiedotObject.haeSaatiedot = function(filters)
	{
		var deferred = $q.defer();
		var softURL = "slim_api/index.php/saatiedot";
		$http.post(softURL, filters).then(function(response){
			deferred.resolve(response.data.data)
		}, function(err){
				deferred.reject("Error: " + err.data);
		});
		return deferred.promise;
	};
	
	// filters sis‰lt‰‰ s‰‰tieto haun rajaukset.
	// Lis‰ tietoja rajauksesta ja sen rakenteesta lyˆtyy JSON_rajaus.js -tiedostosta.
	SaatiedotObject.haeSaatilastot = function(filters)
	{
		var deferred = $q.defer();
		var softURL = "slim_api/index.php/saatilastot";
		$http.post(softURL, filters).then(function(response){
			deferred.resolve(response.data.data[0])
		}, function(err){
				deferred.reject("Error: " + err.data);
		});
		return deferred.promise;
	};
	
	return SaatiedotObject;
});