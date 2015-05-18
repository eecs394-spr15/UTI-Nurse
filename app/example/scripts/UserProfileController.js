angular
  .module('example')
  .controller('UserProfileController', function($scope, supersonic) {
   	$scope.userProfile = undefined;


    $scope.authorize =function(){
supersonic.ui.dialog.alert("Authorized");
    }
    
    supersonic.ui.views.current.params.onValue( function (values) {
      //alert(values.id);
      $scope.userProfile = JSON.parse(values.id);
      $scope.Profile = $scope.userProfile;
      $scope.$apply();
    });
  });
