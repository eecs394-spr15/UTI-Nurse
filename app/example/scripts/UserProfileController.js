angular
  .module('example')
  .controller('UserProfileController', function($scope, supersonic) {
    supersonic.ui.views.current.params.onValue( function (values) {
      //alert(values.id);
      $scope.user = JSON.parse(values.id);
      $scope.Profile = JSON.parse($scope.user.profile);
      $scope.approved = $scope.user.approved;
      $scope.$apply();
    });

     $scope.SetCloudApproved= function(){
          var query = new Parse.Query(Parse.User);
          query.get($scope.user.objectId,{
            success: function(user) {
            	//$scope.patient = user;
            	user.set("approved","Bang!");
            	user.save();
           },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }
          });
      };

      if($scope.approved==="approved") $scope.buttonApproved ="Remove Consent";
	  else if($scope.approved==="rejected") $scope.buttonApproved ="Remove Rejection";
      else $scope.buttonApproved ="Approve";

      	$scope.approve = function(){
      		$scope.SetCloudApproved();
      	};
  });
