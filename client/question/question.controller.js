(function () {
  angular.module('app').controller('questionsCtrl', ['$scope', 'meanData', 'authentication', '$location', '$sce', '$stateParams',
    function ($scope, meanData, authentication, $location, $sce, $stateParams) {

        $scope.meanData = meanData;

      	$scope.getQuestionCategory = function(){
      		meanData.getQuestionCategory().then(function (data) {
          	$scope.categories = data.data;
      		});      	
        };
        // receive question id
        $scope.questionId = $stateParams.id;

    		$scope.getQuestionsByCategory = function(category){
    			meanData.getQuestionsByCategory(category).then(function (data) { // then -> .data // success -> .
            
    				$scope.questions = data.data;
            $scope.totalItems = data.data.length;
            $scope.currentPage = 1;
            $scope.updateQuestionList();
    			});
    		};

      	$scope.submitQuestion = function(){
          if($scope.addQ){
            $scope.addQ.related = [];
            $scope.selRelateds.forEach(function(elem){
              $scope.addQ.related.push(elem);
            });
            meanData.createQuestion($scope.addQ).then(function (res) {
              alert(res.data.message);
              $scope.getQuestionsByCategory($scope.addQ.category);
              $scope.getQuestionCategory();
              $scope.showAdd = false;
            }, function(res){
            alert(res.statusText);
            });
          }
      	};
    }]);
})();