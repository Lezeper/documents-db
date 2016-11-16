(function () {
	angular.module('app').directive('listQue', ['meanData', '$stateParams','authentication', '$state',
		function (meanData, $stateParams, authentication, $state) {
		return {
			scope: false,
      		restrict: 'E',
      		templateUrl: '/common/directives/list-question/list-question.view.html',
      		link: function(scope, element, attr){

      			scope.numPerPage = 5;

      			scope.questionId = $stateParams.id;
      			scope.subCategory = $stateParams.category;

      			// receive question id
		        if(scope.questionId){
		    	      meanData.getQueById(scope.questionId).then(function(res){
		          		scope.filteredQuestions = [res.data];
		          		scope.filteredQuestions[0].showAnswer = true;
		          });
		        } else {
		        	if(scope.subCategory){
		        		meanData.getQuesByCategory(scope.subCategory).then(function (data) {
			                scope.questions = data.data;
			                scope.totalItems = data.data.length;
			                scope.currentPage = 1;
			                scope.updateQueList();
			            });
		        	}
		        	
		        }

		        scope.updateQuePage = function(question){
		        	question.isUpdateQuestion=true;
		        	question.showAnswer=true;
		        	// category directive
		        	scope.showCategories(question.group);
		        	scope.categorySetter(question.category);
		        	// related directive
		        	scope.selRelateds=question.related;

		        	scope.questionBackup = angular.copy(question);
		        }

				scope.updateQueList = function(){
					var begin = (scope.currentPage - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.questions){
				  		scope.filteredQuestions = scope.questions.slice(begin, end);
					}
				}

			    scope.$watch('currentPage + numPerPage', scope.updateQueList);

			    scope.updateQuestion = function(question, selRelateds, categorModel_){
			    	if(confirm("Are you sure to update?")){
			    		var changed = (categorModel_ == question.category ? false : true);
			    		question.category = categorModel_;
				        question.author = authentication.currentUser().name;
				        question.related = [];
		          		selRelateds.forEach(function(elem){
			            	question.related.push(elem);
			          	});
	              		meanData.updateQue(question).then(function(res){
							alert(res.data.message);
							if(changed)
								return $state.reload();
							question.isUpdateQuestion = false;
							setTimeout(function(){
				          		scope.prismHighlight();
				          	});
						}, function(res){
							alert(res.statusText);
						});
			    	}
				};

				scope.cancelUpdateQue = function(question){
					if(confirm("Are you sure to discards update?")){
						Object.keys(question).forEach(function(property){
			          		question[property] = scope.questionBackup[property];
			          	});
						question.isUpdateQuestion=false;
						setTimeout(function(){
			          		scope.prismHighlight();
			          	});
					}
				}

				scope.deleteQuestion = function(question){
					if(confirm("Are you sure to delete this question?")){
						meanData.deleteQue(question._id).then(function(res){
							alert(res.data.message);
							$state.reload();
						},function(res){
							alert(res.statusText);
						});
					}
				};
      		}
    	}
  	}]);
})();