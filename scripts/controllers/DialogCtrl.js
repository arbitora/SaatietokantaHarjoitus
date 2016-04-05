// Dialog is injected in the specified controller
angular.module("SaatietoApp").controller("DialogCtrl", function ($scope, $uibModalInstance){
 
	$scope.errorTitle = "Päivämäärässä Virhe!";
	$scope.errorMessage = "Aloitus päivämäärä on myöhäisempi kuin lopetus päivämäärä.";

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});