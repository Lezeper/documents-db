(function () {
	angular.module('app').directive('listDoc', ['$rootScope','$stateParams', 'meanData', 
					'$state', '$location', 
					function ($rootScope, $stateParams, meanData, $state, $location) {
		return {
      		restrict: 'E',
      		require: '?ngModel',
			scope: false,
      		templateUrl: '/document/list-document/list-document.view.html',
      		link: function(scope, element, attr){

		        scope.docId = $stateParams.id;
		        scope.currentPage = $stateParams.page;
		        scope.mainCategory = $stateParams.mainCategory;

		        var changePage = function(page){
      				var begin = (page - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.docs){
				  		scope.filteredDocs = scope.docs.slice(begin, end);
					}
      			}

      			if(scope.docId){
      				meanData.getDocById(scope.docId).then(function(res){
      					scope.filteredDocs = [res.data];
      					scope.filteredDocs[0].showAnswer = true;
      				});
      			} else {
      				if(scope.subCategory){
      					if(scope.currentPage){
							meanData.getDocByCategory(scope.subCategory).then(function (data) {
				                scope.docs = data.data;
				                scope.$emit("totalItems", data.data.length);
				                scope.selectedPage = scope.currentPage;
								changePage(scope.currentPage);
								scope.$emit("selectedPage", scope.currentPage);
				                scope.updateDocList();
				            });
						} else {
							$location.path().search({page: 1});
						}
      				}
		    	}

		    	scope.goToDocNav = function(){
		            $location.path("/nav/doc");
		        };

      			scope.doDeepCopy = function(doc){
      				scope.backupDoc = angular.copy(doc);
      			}

      			scope.$on("changePage", function(evt, val){
      				$location.path($location.path()).search({page: val});
      				changePage(val);
      			})
      			scope.$on("changeNumPerPage", function(evt, val){
      				scope.numPerPage = val;
      				scope.updateDocList();
      			})
      			scope.$on("changeDateSortOption", function(evt, val){
      				scope.docs.reverse();
      				scope.updateDocList();
      			});

      			scope.clearDocList = function(){
      				scope.filteredDocs = null;
      			}

				scope.updateDocList = function(doc){
					if(typeof doc == "object"){
						var result = [];
						result.push(doc);
						return scope.filteredDocs = result;
					}
					changePage(scope.currentPage);
				}

			    scope.$watch("currentPage", function(){
			    	if(scope.currentPage > 0){
			    		scope.updateDocList();
			    	}
			    });

		        scope.resetUpdateDoc = function(doc){
		          if(confirm("Are you sure to discard your records?")){
		          	scope.backupDoc.isUpdateDoc = false;
		          	
		          	Object.keys(doc).forEach(function(property){
		          		doc[property] = scope.backupDoc[property];
		          	});
		          	setTimeout(function(){
		          		scope.prismHighlight();
		          	});

		          	doc.showAnswer = true;
		          }
		        }
		        
		        scope.updateDocPage = function(doc){
		        	doc.isUpdateDoc=true;
		        	scope.doDeepCopy(doc);
		        	// category directive
		        	scope.showCategories(doc.group);
		        	scope.categorySetter(doc.category);
		        	// related directive
		        	scope.selRelateds = doc.related;
		        }

			    scope.updateDoc = function(doc, categorModel_){
			    	var changed = (categorModel_ == doc.category ? false : true);
					if(confirm("Are you sure to make a update?")){
						doc.related = [];
						doc.category = categorModel_;
						// related directive
		          		scope.selRelateds.forEach(function(elem){
			            	doc.related.push(elem);
			          	});
			      		meanData.updateDoc(doc).then(function (res) {
			        		alert(res.data.message);
			        		if(changed)
			        			return $state.reload();
			        		doc.isUpdateDoc=false;
			        		setTimeout(function(){
				          		scope.prismHighlight();
				          	});
			      		  }, function(res){
			      			alert(res.statusText);
			      		});
			      	}
				};

				scope.deleteDoc = function(doc){
					if(confirm("Are you sure to delete this document?")){
						meanData.deleteDoc(doc._id).then(function(res){
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