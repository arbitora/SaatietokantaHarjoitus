angular.module("SaatietoApp").service("DateService", function(){
	// Yleiset p‰iv‰m‰‰r‰ muuttujat, joita voidaan k‰ytt‰‰ eri kontrolloreiden v‰lill‰.
	var _valittu_minPVM = "";
	var _valittu_maxPVM = "";
	
	this.valittu_minPVM = _valittu_minPVM;
	this.valittu_maxPVM = _valittu_maxPVM;
});