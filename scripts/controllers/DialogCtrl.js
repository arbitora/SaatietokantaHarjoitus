// Dialog is injected in the specified controller
angular.module("SaatietoApp").controller("DialogCtrl", function ($scope, $uibModalInstance, DialogService){
 
	$scope.modalTitle = DialogService.modalTitle;
	$scope.errorTitle = DialogService.errorTitle;
	$scope.errorMessage = DialogService.errorMessage;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});