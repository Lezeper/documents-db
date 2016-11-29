(function () {
	angular.module('app').directive('addDoc', ['$stateParams', 'meanData', 
					'$state', '$location', 'authentication', 
					function ($stateParams, meanData, $state, $location, 
						authentication) {
		return {
      		restrict: 'E',
      		require: '?ngModel',
			scope: false,
      		templateUrl: '/document/add-document/add-document.view.html',
      		link: function($scope, element, attr){

		        $scope.addDocPage = function(){
		        	$scope.addD = new Object();
		            $scope.showAdd=true;
		            $scope.addD.category=$stateParams.category;
		            $scope.addD.title = 
		                  $scope.subCategory.toLowerCase()+" ";
		            // category directive
		            $scope.showCategories('doc');
		            $scope.categorySetter($scope.addD.category);
		            $scope.selRelateds = [];
		        }

		        $scope.cancelAddDoc = function(){
		        	if(confirm("Are you sure to discard the create?")){
		              // from related directive
		              $scope.selRelateds = null;
		              $scope.addD = null;
		            }
		        }

		        $scope.submitDoc = function(){
		            if($scope.addD){
		                $scope.addD.related = [];
		                $scope.addD.category = $scope.categorModel_;
		                // from related directive
		                $scope.selRelateds.forEach(function(elem){
		                  $scope.addD.related.push(elem);
		                });

		                $scope.addD.author = authentication.currentUser().name;
		                meanData.createDoc($scope.addD).then(function (res) {
		                    alert(res.data.message);
		                    $state.reload();
		                }, function(err){
		                	alert(err.data.message);
		            	});
		          	}
		      	};
      		}
      	}
    }]);
})();