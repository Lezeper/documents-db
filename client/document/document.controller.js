(function () {
  angular.module('app').controller('docCtrl', ['$scope', 'meanData', 'authentication', '$location', 
    '$state', '$stateParams', function ($scope, meanData, 
      authentication, $location, $state, $stateParams) {
        
        $scope.hostName = $location.protocol() + "://" + location.host;

        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.goToDataNav = function(){
          $location.path("/nav/doc");
        };

        $scope.cancelAddDoc = function(){
          if(confirm("Are you sure to discard the create?")){
            // from related directive
            $scope.selRelateds = null;
            $scope.addD = null;
          }
        }

        $scope.addDocPage = function(){
          $scope.addD = new Object();
          $scope.showAdd=true;
          $scope.addD.category=$stateParams.category;
          // category directive
          $scope.showCategories('doc');
          $scope.categorySetter($scope.addD.category);
          $scope.selRelateds = [];
        }

      	$scope.submitDoc = function(){
          if($scope.addD){
            $scope.addD.related = [];
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
    }]);
})();