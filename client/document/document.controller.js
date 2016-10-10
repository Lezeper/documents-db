(function () {
  angular.module('app').controller('docCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams',
    function ($scope, meanData, authentication, $location, $sce, $stateParams) {

        $scope.meanData = meanData;
        $scope.docId = $stateParams.id;

        $scope.isLoggedIn = authentication.isLoggedIn();

      	$scope.getDocCategories = function(){
      		meanData.getDocCategories().then(function (data) {
          		$scope.categories = data.data;
      		});      	
        };


    		$scope.getDocByCategory = function(category){
    			meanData.getDocByCategory(category).then(function (data) {
  				    $scope.docs = data.data;
	            $scope.totalItems = data.data.length;
	            $scope.currentPage = 1;
	            $scope.updateDocList();
    			});
    		};

      	$scope.submitDoc = function(){
          if($scope.addD){
            $scope.addD.related = [];
            $scope.selRelateds.forEach(function(elem){
              $scope.addD.related.push(elem);
            });

            authentication.currentUser().then(function(res){
              $scope.addD.author = res.name;

              meanData.createDoc($scope.addD).then(function (res) {
                alert(res.data.message);
                $scope.getDocCategories($scope.addD.category);
                $scope.getDocByCategory();
                $scope.showAdd = false;
                $scope.addD = null; // reset add document panel
                }, function(res){
                alert(res.statusText);
              });
            });
          }
      	};
    }]);
})();