(function () {
  var app = angular.module('app')
  app.controller('authCtrl', ['$scope', 'authentication', 'meanData', '$window','$rootScope', 
      function ($scope, authentication, meanData, $window, $rootScope) {

      $scope.LoginErr = false;

      $scope.login = function (user) {
        authentication.login(user)
          .error(function () {
            $scope.LoginErr = true;
          })
          .then(function () {
            window.location.href = "/";
          })
      };

      $scope.register = function (userr) {
        meanData.createUser(userr).then(function (res) {
          alert(res.data.message);
          // after registering, auto login
          $scope.login(userr);
        },function(err){
          alert(err.statusText);
        })
      };

    }]);
  app.directive("pswVali", function(){
    return {
      restrcit: "A",
      scope: false,
      require: "ngModel",
      link: function(scope, attr, elem, ctrl){
        ctrl.$parsers.push(function(val){
          for(var i = 0; i < val.length; i++){
            // contain number 0-9
            var containNumPattern = /[0-9]/;
            if(containNumPattern.test(val)){
              ctrl.$setValidity("containNum", true);
            } else {
              ctrl.$setValidity("containNum", false);
            }
            // contain capital letter A-Z
            var containCapitalPattern = /[A-Z]/;
            if(containCapitalPattern.test(val)){
              ctrl.$setValidity("containCapital", true);
            } else {
              ctrl.$setValidity("containCapital", false);
            }
            return val;
          }
        });
      }
    }
  })
})();