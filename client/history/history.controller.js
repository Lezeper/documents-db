(function(){
	angular.module("app").controller('historyCtrl',
		['$scope', 'meanData', function($scope, meanData){
		$scope.getHistory = function(){
			meanData.getSettings().then(function(res){
				$scope.history = res.data[0].history;
			});
		}
	}]);
})();