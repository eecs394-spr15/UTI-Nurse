angular
  .module('example')
  .controller('ReportController', function($scope, supersonic) {


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

$scope.sendMailApprove =function(){
      $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': 'kccN6db5ZPOpNJ2XzWz9Eg',
          'message': {
            'from_email': 'nurse@gmail.com',
            'to': [
              {
                'email': $scope.email,
                'name': $scope.Profile.firstName,
                'type': 'to'
              }
            ],
            'subject': 'Your case is approved',
            'html': 'Your case is approved!'
          }
        }
      });
    };

    $scope.sendMailDeny =function(){
      $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': 'kccN6db5ZPOpNJ2XzWz9Eg',
          'message': {
            'from_email': 'nurse@gmail.com',
            'to': [
              {
                'email': $scope.email,
                'name': $scope.Profile.firstName,
                'type': 'to'
              }
            ],
            'subject': 'Your case is Denied',
            'html': 'Your case is Denied!'
          }
        }
      });
    };

    $scope.approve = function(id, antibiotic){
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
$scope.sendMailApprove();
alert("Patient Notified!");
      var Point = Parse.Object.extend("Case");
        var point = new Point();
        point.id = id;

        // Set a new value on quantity
        point.set("status", "Approved");
        point.set("antibiotic", antibiotic);

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

    $scope.suggest = function(id, antibiotic){
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
$scope.sendMailDeny();
alert("Suggestion Sent!");
      var Point = Parse.Object.extend("Case");
        var point = new Point();
        point.id = id;

        // Set a new value on quantity
        point.set("status", "Denied");
        point.set("antibiotic", antibiotic);

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
        else supersonic.ui.dialog.alert("You have not submitted a UTI report yet.");
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
              $scope.Category.createdBy = results[0].get("createdBy");
              $scope.Category.clinic = (($scope.Category.pregnant == "Yes") || ($scope.Category.blood == "Yes") ||
                ($scope.Category.fever == "Yes") || ($scope.Category.vaginal == "Yes") || ($scope.Category.flank == "Yes"));
              
            },
            error: function(error) {
              //alert("Error: " + error.code + " " + error.message);
            }
          }).then(function(results){
            // alert($scope.Category.createdBy.id);
            var userQuery = new Parse.Query(Parse.User);

            userQuery.get($scope.Category.createdBy.id, {
              success: function(user) {
                $scope.email = user.get("email");
                 $scope.Profile = JSON.parse(user.get("profile"));// The object was retrieved successfully.
                 //alert(user.get("profile"));
                 if ($scope.Profile.sulfa === undefined){
                  $scope.Profile.sulfa = false;
                 }
                 if ($scope.Profile.nitrofurantoin=== undefined){
                  $scope.Profile.nitrofurantoin = false;
                 }
                 $scope.Category.sulfa = $scope.Profile.sulfa;
                $scope.Category.nitrofurantoin = $scope.Profile.nitrofurantoin;

                if (($scope.Category.sulfa === true) && ($scope.Category.nitrofurantoin === true)){
                  $scope.Category.antibiotic = "Ciprofloxacin 500mg twice daily for 3 days";
                }

                if (($scope.Category.sulfa === true) && ($scope.Category.nitrofurantoin === false)){
                  $scope.Category.antibiotic = "Nitrofurantoin twice daily for 5 days";
                }

                if ($scope.Category.sulfa === false){
                  $scope.Category.antibiotic = "Trimethoprim-Sulfamethoxazole twice daily for 3 days";
                }

                


                 $scope.$apply();
              },
              error: function(object, error) {
                supersonic.ui.dialog.alert("Error: " + error.message);// The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
              }
            });
          });
    });
 });