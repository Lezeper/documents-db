(function () {
  angular.module('app').controller('docNavCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams', '$state',
    function ($scope, meanData, authentication, $location, $sce, $stateParams, $state) {
        
        $scope.meanData = meanData;
        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.getCategories = function(){
          meanData.getCategoriesByGroup('doc').then(function(data){
            $scope.mainCategories = data.data;
          }, function(err){
            alert(err.data.errmsg);
          });
        };

        $scope.submitCat = function(){
          meanData.createCategory($scope.addCat).then(function(res){
            alert(res.data.message);
            $state.reload();
          }, function(err){
            alert(err.data.errmsg);
          });
        };

        $scope.goToSubCatPage = function(mainCategory,category){
          $location.path("/doc/"+mainCategory+"/"+category);
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