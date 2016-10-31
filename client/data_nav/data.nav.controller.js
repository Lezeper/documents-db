(function () {
  angular.module('app').controller('dataNavCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams', '$state',
    function ($scope, meanData, authentication, $location, $sce, $stateParams, $state) {
        
        $scope.meanData = meanData;
        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.group = $stateParams.group;

        if($scope.group == 'doc'){
          $scope.navTitle = "Documents"
        }
        if($scope.group == 'que'){
          $scope.navTitle = "Questions Set"
        }

        $scope.getCategories = function(){
          meanData.getCategoriesByGroup($scope.group).then(function(data){
            $scope.mainCategories = data.data;
          }, function(err){
            alert(err.data.errmsg);
          });
        };

        $scope.submitCat = function(){
          $scope.addCat.group = $scope.group;
          meanData.createCategory($scope.addCat).then(function(res){
            alert(res.data.message);
            $state.reload();
          }, function(err){
            console.log(err);
            alert(err.data.errmsg);
          });
        };

        $scope.goToSubCatPage = function(mainCategory,category){
          $location.path("/"+$scope.group+"/"+mainCategory+"/"+category);
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