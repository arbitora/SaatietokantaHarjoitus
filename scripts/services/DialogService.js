angular.module("SaatietoApp").service("DialogService", function(){
	
	var _modalTitle = "";
	var _errorTitle = "";
	var _errorMessage = "";

	this.modalTitle = _modalTitle;
	this.errorTitle = _errorTitle;
	this.errorMessage = _errorMessage;
});