(function () {
  angular.module('app').controller('docCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams',
    function ($scope, meanData, authentication, $location, $sce, $stateParams) {
        
        $scope.meanData = meanData;
        $scope.docId = $stateParams.id;
        $scope.subCategory = $stateParams.category;
        $scope.mainCategory = $stateParams.mainCategory;
        
        $scope.hostName = $location.protocol() + "://" + location.host;

        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.showCategories = function(){
          meanData.getCategoriesByGroup('doc').then(function(res){
            $scope.categoriesOptions = res.data;
          });
        };

        $scope.goToDataNav = function(){
          $location.path("/nav/doc");
        };
        
    		$scope.getDocsByCategory = function(){
          if(!$scope.docId){
              meanData.getDocByCategory($scope.subCategory).then(function (data) {
                $scope.docs = data.data;
                $scope.totalItems = data.data.length;
                $scope.currentPage = 1;
                $scope.updateDocList();
            });
          }
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
                $scope.getDocsByCategory();
                $scope.showAdd = false;
                $scope.addD = null; // reset add document panel
                }, function(err){
                alert(err.data.message);
              });
            });
          }
      	};
    }]);
})();