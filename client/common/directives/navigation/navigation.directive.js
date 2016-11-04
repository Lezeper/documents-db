(function () {
  angular.module('app').directive('navigation', function () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navigation/navigation.view.html'
    }
  }).controller('navCtrl', ['$scope', '$location', 'authentication', '$state', '$window',
  function($scope, $location, authentication, $state, $window){
    $scope.logout = function () {
      authentication.logout();
      $window.location.href = "/";
    };
    
    // get current user
	  $scope.currentUser = authentication.currentUser();
	
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.isActive = function(viewLocation){
      if(viewLocation === '/')
        return $location.path() === viewLocation;
      return $location.path().indexOf(viewLocation) >= 0;
    };
  }])
})();