(function () {
	angular.module('app').directive('listQue', ['meanData', '$stateParams',
		'authentication', '$state', '$location',
		function (meanData, $stateParams, authentication, $state, $location) {
		return {
			scope: false,
      		restrict: 'E',
      		templateUrl: '/question/list-question/list-question.view.html',
      		link: function(scope, element, attr){

      			scope.questionId = $stateParams.id;
      			scope.mainCategory = $stateParams.mainCategory;
      			scope.currentPage = $stateParams.page;

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
			                scope.$emit("totalItems", data.data.length);
			                if(scope.currentPage){
								scope.selectedPage = scope.currentPage;
								changePage(scope.currentPage);
								scope.$emit("selectedPage", scope.currentPage);
							} else {
								$location.path().search({page: 1});
							}
			                scope.updateQueList();
			            });
		        	}
		        	
		        }

		        scope.sendRequest = function(req, que){
		        	if(!req)
		        		return alert("Invalid Input!");
		        	req.link = scope.hostName + "/" + que.group + "?id=" + que._id;
		        	meanData.sendUserRequest(req).then(function(res){
		        		alert(res.data.message);
		        		Object.keys(req).forEach(function(k){
			        		req[k] = null;
			        	});
		        		que.showCorrect = false;
		        	});
		        }

		        scope.$on("changePage", function(evt, val){
      				$location.path($location.path()).search({page: val});
      			})
      			scope.$on("changeNumPerPage", function(evt, val){
      				scope.numPerPage = val;
      				scope.updateQueList();
      			})

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

		        var changePage = function(page){
      				var begin = (page - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.questions){
				  		scope.filteredQuestions = scope.questions.slice(begin, end);
					}
      			}

				scope.updateQueList = function(que){
					if(typeof que == "object"){
						var result = [];
						result.push(que);
						return scope.filteredQuestions = result;
					}
					changePage(scope.currentPage);
				}

			    scope.$watch("currentPage", function(){
			    	if(scope.currentPage > 0){
			    		scope.updateQueList();
			    	}
			    });

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