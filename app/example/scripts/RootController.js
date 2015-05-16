angular
  .module('example')
  .controller('RootController', function($scope,$interval,supersonic) {
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

    $scope.profileFunction = function(patient){
      return patient.get("profile");
    };
     $scope.checkUserSubmitted= function(){
          var query = new Parse.Query(Parse.User);
          query.equalTo("submitted", true);
          query.find({
            success: function(results) {
              $scope.patients= results;
              $scope.$apply();
              //alert("Successfully retrieved " + results.length + " users.");
              // Do something with the returned Parse.Object values
              //for (var i = 0; i < results.length; i++) { 
              //  var object = results[i];
              //  alert(object.id + ' - ' + object.get('username'));
              //}
            },
            error: function(error) {
              //alert("Error: " + error.code + " " + error.message);
            }
          });
      };
      $scope.checkUserSubmitted();
      setInterval($scope.checkUserSubmitted, 3000);
  });
