(function () {
  angular.module('app').controller('listContainerCtrl', 
  	['$scope', '$rootScope', 'meanData', 'authentication', '$location', '$stateParams',
    '$state', '$stateParams', function ($scope, $rootScope, meanData, 
      authentication, $location, $stateParams, $state, $stateParams) {
        
        $scope.hostName = $location.protocol() + "://" + location.host;
        $scope.isLoggedIn = authentication.isLoggedIn();
		$scope.subCategory = $stateParams.category;

		$scope.numPerPage = 5;

		$scope.$on("totalItems", function(evt, val){
			$scope.totalItems = val;
		});

		$scope.$on("selectedPage", function(evt, val){
			$scope.selectedPage = val;
		});

		$scope.goToDataNav = function(){
			$location.path("/nav/"+$location.path().split("/")[2]);
		}

		$scope.$watch("numPerPage", function(){
			if($scope.numPerPage > 0){
				$scope.$broadcast("changeNumPerPage", $scope.numPerPage);
			}
		});

		$scope.$watch("selectedPage", function(){
	    	if($scope.selectedPage > 0){
	    		$scope.$broadcast("changePage", $scope.selectedPage);
	    	}
	    });
    }]);
})();