angular.module("SaatietoApp").service("DateService", function($filter){
	
	// Muuntaa YYYY-MM-DD date objektiksi.
	var _DateStampTODate = function(dateStamp)
	{
		var newDate = null;
		if (dateStamp != null)
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
			newDate = new Date();
			newDate.setFullYear(year);
			newDate.setMonth(month-1);
			newDate.setDate(day);
		}

		return newDate;
	};
	
	
	// Yleiset päivämäärä muuttujat, joita voidaan käyttää eri kontrolloreiden välillä.
	var _valittu_minPVM = "2000-01-01";
	var _valittu_maxPVM = $filter('date')(new Date(), 'yyyy-MM-dd');

	this.valittu_minPVM = _valittu_minPVM;
	this.valittu_maxPVM = _valittu_maxPVM;
	this.DateStampTODate = _DateStampTODate;
});