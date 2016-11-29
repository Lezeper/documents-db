(function () {
  angular.module('app').directive('addQue', ['meanData', 'authentication', '$location', 
    '$stateParams', '$state', function (meanData, authentication, $location, $stateParams, 
      $state) {
      return {
          restrict: 'E',
          require: '?ngModel',
          scope: false,
          templateUrl: '/question/add-question/add-question.view.html',
          link: function($scope, element, attr){
            
            $scope.showCategories = function(){
              meanData.getCategoriesByGroup('que').then(function(res){
                $scope.categoriesOptions = res.data;
              });
            };

            $scope.goToQueNav = function(){
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
                $scope.addQ.category = $scope.categorModel_;
                $scope.addQ.author = authentication.currentUser().name;
                meanData.createQue($scope.addQ).then(function (res) {
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