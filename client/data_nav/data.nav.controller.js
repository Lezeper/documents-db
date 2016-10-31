(function () {
  angular.module('app').controller('dataNavCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams', '$state',
    function ($scope, meanData, authentication, $location, $sce, $stateParams, $state) {
        
        $scope.meanData = meanData;
        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.gourp = $stateParams.group;

        $scope.getCategories = function(){
          meanData.getCategoriesByGroup($scope.gourp).then(function(data){
            $scope.mainCategories = data.data;
          }, function(err){
            alert(err.data.errmsg);
          });
        };

        $scope.submitCat = function(){
          $scope.addCat.group = $scope.gourp;
          meanData.createCategory($scope.addCat).then(function(res){
            alert(res.data.message);
            $state.reload();
          }, function(err){
            alert(err.data.errmsg);
          });
        };

        $scope.goToSubCatPage = function(mainCategory,category){
          $location.path("/"+$scope.gourp+"/"+mainCategory+"/"+category);
        };

        $scope.updateCategory = function(uCat){
          meanData.updateCategory(uCat).then(function(res){
            alert(res.data.message);
            $state.reload();
          },function(err){
            alert(err.data.errmsg);
          });
        };

        $scope.deleteCategory = function(id){
          meanData.deleteCategory(id).then(function(res){
            alert(res.data.message);
            $state.reload();
          },function(err){
            alert(err.data.errmsg);
          });
        };
    }]);
})();