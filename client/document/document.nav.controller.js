(function () {
  angular.module('app').controller('docNavCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams',
    function ($scope, meanData, authentication, $location, $sce, $stateParams) {
        
        $scope.meanData = meanData;
        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.getCategories = function(){
          meanData.getCategoriesByGroup('doc').then(function(data){
            $scope.mainCategories = data.data;
          });
        };

        $scope.submitCat = function(){
          meanData.createCategory($scope.addCat).then(function(res){
            alert(res.data.message);
          }, function(err){
            alert(err.data.errmsg);
          });
        };

        $scope.goToSubCatPage = function(mainCategory,category){
          $location.path("/doc/"+mainCategory+"/"+category);
        }
    }]);
})();