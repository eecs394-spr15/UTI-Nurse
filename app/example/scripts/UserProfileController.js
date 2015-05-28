angular
  .module('example')
  .controller('UserProfileController', function($scope, supersonic) {
   	$scope.userProfile = undefined;


    $scope.authorize =function(){
supersonic.ui.dialog.alert("Authorized");
    }

    $scope.suggestClinicVisit =function(){
supersonic.ui.dialog.alert("Suggested");
    }

    supersonic.ui.views.current.params.onValue( function (values) {
      var query = new Parse.Query(Parse.User);
      //alert(JSON.parse(values.id));

        query.get(JSON.parse(values.id).objectId, {
          success: function(user) {
             $scope.Profile = JSON.parse(user.get("profile"));// The object was retrieved successfully.
             $scope.apply();
          },
          error: function(object, error) {
            supersonic.ui.dialog.alert("Error: " + error.message);// The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });
    });
  });
