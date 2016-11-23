(function(){
	var app = angular.module('app');
	app.controller('userReqCtrl', ["$scope", "meanData", "$state",
		function($scope, meanData, $state){

		$scope.getAllUserRequests = function(){
			meanData.getAllUserRequests().then(function(res){
				$scope.requests = res.data;
			});
		}

		$scope.deleteRequest = function(id){
			meanData.deleteUserRequest(id).then(function(res){
				alert(res.data.message);
				$state.reload();
			});
		}
	}]);
})();