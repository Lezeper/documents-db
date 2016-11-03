(function(){
	angular.module('app').directive('related', ['meanData',
			function(meanData){
		return {
			scope: false,
			restrict: 'E',
			templateUrl: '/common/directives/related/related.view.html',
			link: function(scope, element, attr){
				
				scope.removeCurSelRelated = function(selRelateds, index){
		          selRelateds.splice(index, 1);
		        };

				scope.addThisRelated = function(selRelateds, thisRelated){
		          if(!thisRelated)
		            return false;
		          if(selRelateds.length < 1){
		            selRelateds.push(thisRelated[0]);
		          }else{
		            for(var i = 0; i < selRelateds.length; i++){
		              if(selRelateds[i].title != thisRelated[0].title){
		                if(i == (selRelateds.length-1)){
		                  selRelateds.push(thisRelated[0]);
		                }
		              }else{
		                break;
		              }
		            }
		          }
		        };

		        scope.getRelatedByKeyword = function(searchRelatedKeyword){
		          if(searchRelatedKeyword){
		            meanData.getRelatedByKeyword(searchRelatedKeyword).then(function(data){
		              var relateds = [];
		              data.forEach(function(object){
		                object.data.forEach(function(obj){
		                  relateds.push(obj);
		                });
		              });
		              scope.relateds = relateds;
		              scope.$digest();
		            });
		          }else{
		          	scope.relateds = null;
		          }
		        };
			}
		}
	}]);
})();