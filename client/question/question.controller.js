(function () {
  angular.module('app').controller('queCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams',
    function ($scope, meanData, authentication, $location, $sce, $stateParams) {

        $scope.meanData = meanData;
        $scope.queId = $stateParams.id;
        $scope.subCategory = $stateParams.category;
        $scope.mainCategory = $stateParams.mainCategory;
        $scope.authentication = authentication;

        $scope.hostName = $location.protocol() + "://" + location.host;

        $scope.isLoggedIn = authentication.isLoggedIn();
        
        $scope.showCategories = function(){
          meanData.getCategoriesByGroup('que').then(function(res){
            $scope.categoriesOptions = res.data;
          });
        };

        $scope.goToDataNav = function(){
          $location.path("/nav/que");
        };

        $scope.getQuesByCategory = function(){
          if(!$scope.docId){
              meanData.getQuesByCategory($scope.subCategory).then(function (data) {
                $scope.questions = data.data;
                $scope.totalItems = data.data.length;
                $scope.currentPage = 1;
                $scope.updateQueList();
            });
          }
        };

        $scope.submitQue = function(){
          if($scope.addQ){
            $scope.addQ.related = [];
            $scope.selRelateds.forEach(function(elem){
              $scope.addQ.related.push(elem);
            });

            authentication.currentUser().then(function(res){
              $scope.addQ.author = res.name;

              meanData.createQue($scope.addQ).then(function (res) {
                alert(res.data.message);
                $scope.getQuesByCategory();
                $scope.showAdd = false;
                $scope.addQ = null; // reset add document panel
                }, function(err){
                alert(err.data.message);
              });
            });
          }
        };
    }]);
})();