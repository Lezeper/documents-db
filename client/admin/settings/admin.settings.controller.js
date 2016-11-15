(function(){
	angular.module('app').controller('adminSettingsCtrl', ['$scope', 'meanData',
				'$state', function($scope, meanData, $state){

		$scope.backupDB = function(){
			meanData.doDBBackup().then(function(res){
				alert(res.data.message);
				$state.reload();
			});
		}

		$scope.getSettings = function(){
			meanData.getSettings().then(function(res){
				if(res.length > 1){
					alert("More than one settings found!");
				}
				else{
					$scope.settings = res.data[0];
				}
			});
		}

		$scope.updateSettings = function(settings){
			meanData.updateSettings(settings).then(function(res){
				alert(res.data.message);
				window.location.href = "/admin/settings";
			});
		}

		$scope.deleteSettings = function(){
			meanData.deleteSettings().then(function(res){
				alert(res.data.message);
			});
		}
	}])
})();