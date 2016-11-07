(function(){
	angular.module('app').controller('adminOverviewsCtrl', ['$scope', 
		'meanData', function($scope, meanData){

		$scope.getDocCounts = function(){
			meanData.getDocCounts().then(function(res){
				$scope.docNums = res.data;
			});
		}

		$scope.getQueCounts = function(){
			meanData.getQueCounts().then(function(res){
				$scope.queNums = res.data;
			});
		}
	}])
})();