angular.module("SaatietoApp").service("FilterService", function(){
	// Yleiset rajoitus muuttujat joita voidaan k‰ytt‰‰ eri kontrollereiden hauissa REST-palvelua vasten.
	
	// TODO Lis‰‰ yleiset rajaus muuttujat.
	var _minLampotila = "";
	var _maxLampotila = "";
	var _minTuulennopeus = "";
	var _maxTuulennopeus = "";
	var _minSademaara = "";
	var _maxSademaara = "";
	var _jarjestaja = "id";
	var _jarjestys = "ASC";
	
	this.minLampotila = _minLampotila;
	this.maxLampotila = _maxLampotila;
	this.minTuulennopeus = _minTuulennopeus;
	this.maxTuulennopeus = _maxTuulennopeus;
	this.minSademaara = _minSademaara;
	this.maxSademaara = _maxSademaara;
	this.jarjestaja = _jarjestaja;
	this.jarjestys = _jarjestys;
});