angular.module("SaatietoApp").service("FilterService", function(){
	// Yleiset rajoitus muuttujat joita voidaan k‰ytt‰‰ eri kontrollereiden hauissa REST-palvelua vasten.
	
	// TODO Lis‰‰ yleiset rajaus muuttujat.
	
	var _jarjestaja = "id";
	var _jarjestys = "ASC";
	
	this.jarjestaja = _jarjestaja;
	this.jarjestys = _jarjestys;
});