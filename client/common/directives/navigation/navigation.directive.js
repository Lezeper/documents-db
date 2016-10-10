(function () {
  angular.module('app').directive('navigation', function () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navigation/navigation.view.html'
    }
  }).controller('navCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication){
    $scope.logout = function () {
      authentication.logout();
      window.location.href = "/";
    };
    // get current user
	var promise = authentication.currentUser();
	if(promise){
		promise.then(function(value){
	    	$scope.currentUser = value;
	    });
	}
	
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path();
    };
  }])
})();