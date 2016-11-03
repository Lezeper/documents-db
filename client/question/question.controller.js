(function () {
  angular.module('app').controller('queCtrl', ['$scope', 'meanData', 'authentication', '$location', 
    '$stateParams', '$state', function ($scope, meanData, authentication, $location, $stateParams, 
      $state) {
      
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

        $scope.addQuePage = function(){
          $scope.addQ = new Object();
          $scope.showAdd=true;
          $scope.showCategories('que');
          $scope.addQ.category = $stateParams.category;
          $scope.categorySetter($scope.addQ.category);
          $scope.selRelateds = [];
        }

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
                $state.reload();
                }, function(err){
                alert(err.data.message);
              });
            });
          }
        };
    }]);
})();