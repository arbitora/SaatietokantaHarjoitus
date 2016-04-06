angular.module("SaatietoApp").service("FilterService", function(){
	
	// Yleiset rajoitus muuttujat joita voidaan k‰ytt‰‰ eri kontrollereiden hauissa REST-palvelua vasten.
	var _minLampotila = "";
	var _maxLampotila = "";
	var _minTuulennopeus = "";
	var _maxTuulennopeus = "";
	var _minSademaara = "";
	var _maxSademaara = "";
	var _jarjestaja = "id";
	var _jarjestys = "ASC";
	
	// Ovatko rajaukset pois p‰‰lt‰ rajoita.html sivulla.
	// Jos false, nykyiset arvot vied‰‰n laatikoihin.
	var _minLampotila_disabled = true;
	var _maxLampotila_disabled = true;
	var _minTuulennopeus_disabled = true;
	var _maxTuulennopeus_disabled = true;
	var _minSademaara_disabled = true;
	var _maxSademaara_disabled = true;
	
	// Muuttavat Filter Service muuttujan arvoja.
	
	this.minLampotila = _minLampotila;
	this.maxLampotila = _maxLampotila;
	this.minTuulennopeus = _minTuulennopeus;
	this.maxTuulennopeus = _maxTuulennopeus;
	this.minSademaara = _minSademaara;
	this.maxSademaara = _maxSademaara;
	this.jarjestaja = _jarjestaja;
	this.jarjestys = _jarjestys;

	this.minLampotila_disabled = _minLampotila_disabled;
	this.maxLampotila_disabled = _maxLampotila_disabled;
	this.minTuulennopeus_disabled = _minTuulennopeus_disabled;
	this.maxTuulennopeus_disabled = _maxTuulennopeus_disabled;
	this.minSademaara_disabled = _minSademaara_disabled;
	this.maxSademaara_disabled = _maxSademaara_disabled;
});