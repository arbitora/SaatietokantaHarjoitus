angular.module("SaatietoApp").service("FunktioService", function(){
	
	// Jos syötetty muuttuja on tyhjä eli "", palauta true, muuten false.
	var _isEmpty = function(inputValue)
	{
		if (inputValue === "")
			return true;
		else
			return false;
	};
	
	/*
		Jos muuttuja on tyhjä ja se on pois päältä, palauta true.
		Jos muuttuja on täytetty ja se on päällä, palauta true.
		Muutoin false.
	*/
	var _isValid = function(inputValue, inputDisable)
	{
		if (_isEmpty(inputValue) && inputDisable === true)
			return true;
		else if (!_isEmpty(inputValue) && inputDisable === false)
			return true;
		else
			return false;
	};	
	
	/*
		Jos inputValue on pienempi kuin otherValue, palauta true.
		Jos inputValue on olemassa, mutta ei otherValue, palauta true.
		Jos inputValue ei ole olemassa, mutta otherValue on, palauta true.
		Jos inputValue ja otherValue eivät ole kumpikaan olemassa, palauta true.
		Muutoin false.
	*/
	var _isSmallerThan = function(inputValue, otherValue)
	{
		if (inputValue <= otherValue && !_isEmpty(inputValue) && !_isEmpty(otherValue))
			return true;
		else if (!_isEmpty(inputValue) && _isEmpty(otherValue))
			return true;
		else if (_isEmpty(inputValue) && !_isEmpty(otherValue))
			return true;
		else if (_isEmpty(inputValue) && _isEmpty(otherValue))
			return true;
		else
			return false;
	};
	
	
	// Tarkistaa muuttujien toimivuuden.
	/*
			Kunhan inputValue on pienempi tai yhtäsuuri kuin otherValue niin seuraavat pätee:
			- Jos muuttuja on tyhjä ja pois päältä ja toinen muuttuja on päällä ja täytetty oikein = true
			- Jos muuttuja on tyhjä ja pois päältä ja toinen muuttuja on tyhjä ja pois päältä = true
			- Jos muuttuja on päällä ja täytetty oikein ja toinen muuttuja on päällä ja täytetty oikein = true
			- Jos muuttuja on päällä ja täytetty oikein ja toinen muuttuja on tyhjä ja pois päältä = true
			
			Muussa tapauksessa = false.
	*/
	var _areEntriesValid = function(inputValue, otherValue, inputDisable, otherDisable)
	{
		if (_isValid(inputValue, inputDisable) && _isValid(otherValue, otherDisable))
		{
			if (_isSmallerThan(inputValue, otherValue))
				return true;
			else
				return false;
		}
		else
			return false;
	};
	
	// Jos syötetty päivämäärä on null, palauta true, muuten false.
	var _noDate = function(inputDate)
	{
		if (inputDate === null)
			return true;
		else
			return false;
	};
	
	/*
		Jos päivä on tyhjä ja se on pois päällä, palauta true.
		Jos päivä on täytetty ja se on päällä, palauta true.
		Muutoin false.
	*/
	var _isValidDate = function(inputDate, inputDisable)
	{
		if (_noDate(inputDate) && inputDisable === true)
			return true;
		else if (!_noDate(inputDate) && inputDisable === false)
			return true;
		else
			return false;
	};
	
		/*
		Jos inputDate on pienempi kuin otherDate, palauta true.
		Jos inputDate on olemassa, mutta ei otherDate, palauta true.
		Jos inputDate ei ole olemassa, mutta otherDate on, palauta true.
		Jos inputDate ja otherDate eivät ole kumpikaan olemassa, palauta true.
		Muutoin false.
	*/
	var _isSmallerThan = function(inputDate, otherDate)
	{
		if (inputDate <= otherDate && !_noDate(inputDate) && !_noDate(otherDate))
			return true;
		else if (!_noDate(inputDate) && _noDate(otherDate))
			return true;
		else if (_noDate(inputDate) && !_noDate(otherDate))
			return true;
		else if (_noDate(inputDate) && _noDate(otherDate))
			return true;
		else
			return false;
	};
	
	
	// Tarkistaa muuttujien toimivuuden.
	/*
			Kunhan inputDate on pienempi tai yhtäsuuri kuin otherDate niin seuraavat pätee:
			- Jos muuttuja on tyhjä ja pois päältä ja toinen muuttuja on päällä ja täytetty oikein = true
			- Jos muuttuja on tyhjä ja pois päältä ja toinen muuttuja on tyhjä ja pois päältä = true
			- Jos muuttuja on päällä ja täytetty oikein ja toinen muuttuja on päällä ja täytetty oikein = true
			- Jos muuttuja on päällä ja täytetty oikein ja toinen muuttuja on tyhjä ja pois päältä = true
			
			Muussa tapauksessa = false.
	*/
	var _areDatesValid = function(inputDate, otherDate, inputDisable, otherDisable)
	{
		if (_isValidDate(inputDate, inputDisable) && _isValidDate(otherDate, otherDisable))
		{
			if (_isSmallerThan(inputDate, otherDate))
				return true;
			else
				return false;
		}
		else
			return false;
	};
	
	// Ovatko rajaukset pois päältä rajoita.html sivulla.
	// Jos false, nykyiset arvot viedään laatikoihin.
	this.isEmpty = _isEmpty;
	this.isValied = _isValid;
	this.noDate = _noDate;
	this.areEntriesValid = _areEntriesValid;
	this.areDatesValid = _areDatesValid;
});