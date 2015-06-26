app.controller('dateshowController', ['$scope', '$http', function ($scope, $http) {
  
  //var Registrant = $resource('/registrant');
  
  /*Registrant.query(function (results) {
    $scope.registrant = results;
  });*/

  $scope.registrant = {};

  var data = {"__v":0,"_id":"557dd33075fa4af41be6ba80","fupload":"C:\\Users\\feng\\phpworkspace\\mean/server/upload/2015/6/14/894.jpg","sex":"M","firstTimie":false,"attending":true,"whySelect":"sdf","perfectDate":"sdf","numChidren":null,"children":true,"single":"N","crush":"sdf","term":false,"state":"AL","city":"sdf","age":1915,"phone":"1111111111","occupation":"sdf","email":"sdf@dd.com","lastName":"k","firstName":"sd","created":"2015-06-14T19:17:04.856Z"};

  $scope.createNewUser = function () {
    if($scope.registrant.errorMessage) delete $scope.registrant.errorMessage;
    if($scope.registrant.phone1 && $scope.registrant.phone2 && $scope.registrant.phone3){
      $scope.registrant.phone = $scope.registrant.phone1 + $scope.registrant.phone2 + $scope.registrant.phone3;
      /*delete $scope.registrant.phone1;
      delete $scope.registrant.phone2;
      delete $scope.registrant.phone3;*/
    }
    /*$http.post('/registrant', $scope.registrant).success(function(response) {
      console.log(response);
      $scope.registrant = {};
    }).error(function(response) {
      $scope.registrant.errorMessage = response.message;
     // $scope.$apply();
    });*/

    var fd = new FormData();
    fd.append('original', $scope.original);
   /* for(var key in $scope.registrant){
       fd.append(key, $scope.registrant[key]);
       console.log(key + " " + $scope.registrant[key]);
    }*/
    fd.append("registrant", JSON.stringify($scope.registrant));
    console.log(fd.toString());
    $http.post('/registrant', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })
    .success(function(response) {
        //console.log(response);
        $scope.registrant = response;
        //load thanks.html
    }).error(function(response) {
        $scope.registrant.errorMessage = response.message;
    });
  }
}])
  .directive("fileread", [function () {
      return {
          scope: {
              fileread: "="
          },
          link: function (scope, element, attributes) {
              element.bind("change", function (changeEvent) {
                  var reader = new FileReader();
                  reader.onload = function (loadEvent) {
                      scope.$apply(function () {
                          scope.fileread = loadEvent.target.result;
                      });
                  }
                  reader.readAsDataURL(changeEvent.target.files[0]);
              });
          }
      }
  }])
  .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
;