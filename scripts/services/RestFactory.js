angular.module("SaatietoApp").factory("RestFactory", function($http, $q){
	var SaatiedotObject = {};
	
	// Hakee tietokannassa olevat valittavat p‰iv‰m‰‰r‰t.
	SaatiedotObject.haePvm = function()
	{
		var deferred = $q.defer();
		var strictURL = "http://home.tamk.fi/~e5tjokin/Web-ohjelmointi/Harjoitus/slim_api/index.php/dates";
		var softURL = "slim_api/index.php/dates";
		$http.get(strictURL).then(function(response){
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
		var strictURL = "http://home.tamk.fi/~e5tjokin/Web-ohjelmointi/Harjoitus/slim_api/index.php/saatiedot";
		var softURL = "slim_api/index.php/saatiedot";
		$http.post(strictURL, filters).then(function(response){
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
		var strictURL = "http://home.tamk.fi/~e5tjokin/Web-ohjelmointi/Harjoitus/slim_api/index.php/saatilastot";
		var softURL = "slim_api/index.php/saatilastot";
		$http.post(strictURL, filters).then(function(response){
			deferred.resolve(response.data.data[0])
		}, function(err){
				deferred.reject("Error: " + err.data);
		});
		return deferred.promise;
	};
	
	return SaatiedotObject;
});