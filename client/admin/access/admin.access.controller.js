(function(){
	angular.module('app').controller('adminAccessCtrl', ['$scope', 'meanData', 
		'$state', function($scope, meanData, $state){

		$scope.findAllLogs = function(){
			meanData.getAllLogs().then(function(data){
				$scope.logs = data.data;
			});
		}

		$scope.deleteAllLogs = function(){
			meanData.deleteAllLogs().then(function(res){
				alert(res.data.message);
				$state.reload();
			});
		}
	}])
})();