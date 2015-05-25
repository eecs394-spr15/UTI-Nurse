angular
  .module('example')
  .controller('ReportController', function($scope, supersonic) {

    Parse.User.current().fetch();
    $scope.currentUser = Parse.User.current();


    $scope.$apply();

    $scope.reportUTI=function(){
        var UTIcase = Parse.Object.extend("Case");
        var utiCase = new UTIcase();
        
        $scope.Category.now = new Date().toDateString();
        utiCase.set("createdBy",Parse.User.current());
        utiCase.set("status","Pending");
        utiCase.set("questionnaire",JSON.stringify($scope.Category));
                utiCase.save(null, {     //save profile object to database
                success: function(user) {
                supersonic.ui.dialog.alert("New case submitted");
                $scope.$apply();
                },
                  error: function(user, error) {
                    supersonic.ui.dialog.alert("Error: " + error.message);
                  }
              });
          $scope.refresh();
    };

    $scope.approve = function(id){
      // var query = new Parse.Query("Case");
      //     query.equalTo("createdBy", id);
      // query.first({
      //     success: function (Case) {
      //         Case.save(null, {
      //             success: function (case) {
      //               case.set("status", "Approved");
      //               case.save();
      //             }
      //           });
      //         }
      //       });
      var Point = Parse.Object.extend("Case");
        var point = new Point();
        point.id = id;

        // Set a new value on quantity
        point.set("status", "Approved");

        // Save
        point.save(null, {
          success: function(point) {
            // Saved successfully.
          },
          error: function(point, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
          }
        });
    };

    $scope.checkStatus =function(){
        $scope.refresh();
        if($scope.currentUser.get("approved")) supersonic.ui.dialog.alert($scope.currentUser.get("approved"));
        else supersonic.ui.dialog.alert("You have not submitted a UIT report yet.");
    };

    $scope.refresh = function(){
                Parse.User.current().fetch();
                $scope.currentUser = Parse.User.current();
                $scope.$apply();
      };

  supersonic.ui.views.current.params.onValue( function (values) {
      //alert(values.id);
      var query = new Parse.Query("Case");
          query.equalTo("objectId", values.id);
          //alert(values.id);
      query.find({
            success: function(results) {
              $scope.Category=JSON.parse(results[0].get("questionnaire"));
              $scope.Category.objectId = results[0].id;
              $scope.$apply();
            },
            error: function(error) {
              //alert("Error: " + error.code + " " + error.message);
            }
          });
    });
 });