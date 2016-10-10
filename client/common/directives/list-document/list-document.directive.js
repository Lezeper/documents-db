(function () {
	angular.module('app').directive('listDoc', function () {
		return {
      		restrict: 'E',
      		require: '?ngModel',
			scope: false,
      		templateUrl: '/common/directives/list-document/list-document.view.html',
      		link: function(scope, element, attr){
      			scope.numPerPage = 5;

      			if(scope.docId){
      				scope.meanData.getDocById(scope.docId).then(function(res){
      					scope.filteredDocs = [res.data];
      					scope.filteredDocs[0].showAnswer = true;
      				});
      			}

      			scope.doDeepCopy = function(doc){
      				scope.backupDoc = angular.copy(doc);
      			}

				scope.updateDocList = function(){
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
		          	// doc = scope.backupDoc;
		          	// doc.usage = scope.backupDoc.usage;
		          	
		          	Object.keys(doc).forEach(function(property){
		          		doc[property] = scope.backupDoc[property];
		          	});	          
		          	setTimeout(function(){
		          		scope.prismHighlight();
		          	});
		          }
		        }

			    scope.updateDoc = function(doc, selRelatedsUpdate){
					if(confirm("Are you sure to make a update?")){
						doc.related = [];
		          		selRelatedsUpdate.forEach(function(elem){
			            	doc.related.push(elem);
			          	});
			      		scope.meanData.updateDoc(doc).then(function (res) {
			        		alert(res.data.message);
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
						scope.meanData.deleteDoc(doc._id).then(function(res){
							alert(res.data.message);
							scope.getDocByCategory(doc.category);
						scope.getDocCategories();
						},function(res){
							alert(res.statusText);
						});
					}
				};
      		}
    	}
  	})
})();