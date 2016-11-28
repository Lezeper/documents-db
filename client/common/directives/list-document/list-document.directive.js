(function () {
	angular.module('app').directive('listDoc', ['$stateParams', 'meanData', 
					'$state', function ($stateParams, meanData, $state) {
		return {
      		restrict: 'E',
      		require: '?ngModel',
			scope: false,
      		templateUrl: '/common/directives/list-document/list-document.view.html',
      		link: function(scope, element, attr){

      			scope.numPerPage = 5;

		        scope.docId = $stateParams.id;
		        scope.subCategory = $stateParams.category;
		        scope.mainCategory = $stateParams.mainCategory;

      			if(scope.docId){
      				meanData.getDocById(scope.docId).then(function(res){
      					scope.filteredDocs = [res.data];
      					scope.filteredDocs[0].showAnswer = true;
      				});
      			} else {
      				if(scope.subCategory){
      					meanData.getDocByCategory(scope.subCategory).then(function (data) {
			                scope.docs = data.data;
			                scope.totalItems = data.data.length;
			                scope.currentPage = 1;
			                scope.updateDocList();
			            });
      				}
		    	}

      			scope.doDeepCopy = function(doc){
      				scope.backupDoc = angular.copy(doc);
      			}

				scope.updateDocList = function(doc){
					if(typeof doc == "object"){
						var result = [];
						result.push(doc);
						return scope.filteredDocs = result;
					}
					var begin = (scope.currentPage - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.docs){
				  		scope.filteredDocs = scope.docs.slice(begin, end);
					}
				}

			    scope.$watch("currentPage + numPerPage", scope.updateDocList);

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