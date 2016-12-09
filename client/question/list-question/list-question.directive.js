(function () {
	angular.module('app').directive('listQue', ['meanData', '$stateParams',
		'authentication', '$state', '$location',
		function (meanData, $stateParams, authentication, $state, $location) {
		return {
			scope: false,
      		restrict: 'E',
      		templateUrl: '/question/list-question/list-question.view.html',
      		link: function(scope, element, attr){

        		scope.isLoggedIn = authentication.isLoggedIn();
      			scope.questionId = $stateParams.id;
      			scope.mainCategory = $stateParams.mainCategory;
      			scope.currentPage = $stateParams.page;
      			scope.reverse = true;

		        var changePage = function(page){
      				var begin = (page - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.questions){
				  		scope.filteredQuestions = scope.questions.slice(begin, end);
					}
      			}

      			scope.orderByDate = function(item) {
				    var parts = item.created.split('-');
				    temp = parts[2].substring(0,2);
				    var number = parseInt(temp + parts[1] + parts[0]);

				    return -number;
				};

      			// receive question id
		        if(scope.questionId){
		    	      meanData.getQueById(scope.questionId).then(function(res){
		          		scope.filteredQuestions = [res.data];
		          		scope.filteredQuestions[0].showAnswer = true;
		          });
		        } else {
		        	if(scope.subCategory){
		        		if(scope.currentPage){
							meanData.getQuesByCategory(scope.subCategory).then(function (data) {
				                scope.questions = data.data;
				                scope.$emit("totalItems", data.data.length);
				                scope.selectedPage = scope.currentPage;
								changePage(scope.currentPage);
								scope.$emit("selectedPage", scope.currentPage);
				                scope.updateQueList();
				            });
						} else {
							$location.path().search({page: 1});
						}
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
      				changePage(val);
      			});
      			scope.$on("changeNumPerPage", function(evt, val){
      				if(val > -1){
      					scope.numPerPage = val;
      					scope.updateQueList();
      				}
      			});
      			scope.$on("changeDateSortOption", function(evt, val){
      				if(val){
      					scope.questions.reverse();
      					scope.updateQueList();
      				}
      			});

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

		        scope.clearQueList = function(){
		        	scope.filteredQuestions = null;
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
			          	if(question.unknownCompany){
		                  question.company = "Unknown";
		                }
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