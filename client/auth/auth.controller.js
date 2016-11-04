(function () {
  angular.module('app')
    .controller('loginCtrl', ['$scope', 'authentication', 'meanData', '$window','$rootScope', 
      function ($scope, authentication, meanData, $window, $rootScope) {

      $scope.error = false;

      $scope.login = function () {
        authentication.login($scope.user)
          .error(function () {
            $scope.error = true;
          })
          .then(function () {
            window.location.href = "/";
          })
      };

      $scope.register = function () {
        meanData.createUser($scope.userr).then(function (res) {
          alert(res.data.message);
          $scope.user = $scope.userr;
          $scope.login();
        },function(err){
          alert(err.statusText);
        })
      };

    }])
})();