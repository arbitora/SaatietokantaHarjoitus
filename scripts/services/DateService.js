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
	var _haettuMinPVM = null;
	var _haettuMaxPVM = null;
	var _valittu_minPVM = null;
	var _valittu_maxPVM = null;
	
	// Asettaa annetut min ja max haettuihin muuttujiin.
	var _minPVM_disabled = true;
	var _maxPVM_disabled = true;
	
	this.valittu_minPVM = _valittu_minPVM;
	this.valittu_maxPVM = _valittu_maxPVM;
	this.haettuMinPVM = _haettuMinPVM;
	this.haettuMaxPVM = _haettuMaxPVM;
	this.minPVM_disabled = _minPVM_disabled;
	this.maxPVM_disabled = _maxPVM_disabled;
	this.DateStampTODate = _DateStampTODate;
});