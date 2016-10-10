(function () {
  angular.module('app').controller('homeCtrl', ['$scope', 'meanData', 'authentication',
    function ($scope, meanData, authentication) {

      function clearPanels(){
        $scope.filteredQuestions = null;
        $scope.filteredDocs = null;
      }

      $scope.meanData = meanData;

      $scope.$watch('selector', function(){
        $scope.keyword = "";
        clearPanels();
      });
      
      $scope.doSearch = function(){
        if($scope.keyword && $scope.selector){
          if($scope.selector == 'Quiz'){
            meanData.getQuestionByKeyword($scope.keyword).then(function (res){
              $scope.questions = res.data;
              $scope.totalItems = res.data.length;
              $scope.currentPage = 1;
              $scope.updateQuestionList();
            });
          }
          if($scope.selector == 'Doc'){
            meanData.getDocByKeyword($scope.keyword).then(function (res){
              $scope.docs = res.data;
              $scope.totalItems = res.data.length;
              $scope.currentPage = 1;
              $scope.updateDocList();
            });
          }
        }else{clearPanels();}
      };
      
    }]);
})();