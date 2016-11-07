(function(){
	angular.module('app').controller('adminUsersCtrl', ['$scope', 'meanData',
		function($scope, meanData){
		
		meanData.getAllUsers().then(function(res){
			$scope.users = res.data;
		});

		$scope.deleteUser = function(id){
			if(confirm("Are you sure to delete?")){
				meanData.deleteUser(id).then(function(res){
					alert(res.message);
				});
			}
		}
	}])
})();