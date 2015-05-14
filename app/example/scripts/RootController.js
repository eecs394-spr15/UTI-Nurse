angular
  .module('example')
  .controller('RootController', function($scope, supersonic) {
    
    $scope.getNewUserData =function(){
    	//supersonic.ui.dialog.alert("success");
  		var query = new Parse.Query(Parse.User);

        query.get("8bS9XiS1R9", {
          success: function(user) {
             $scope.currentUser =user;// The object was retrieved successfully.
             supersonic.ui.dialog.alert($scope.currentUser.get("email"));
          },
          error: function(object, error) {
            supersonic.ui.dialog.alert("Error: " + error.message);// The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });
  	};
  });
