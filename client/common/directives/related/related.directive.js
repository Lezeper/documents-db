(function(){
	angular.module('app').directive('related', function(){
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

		        scope.getRelatedByKeyword = function(searchRelatedKeyword, rest){
		          if(searchRelatedKeyword){
		            scope.meanData.getRelatedByKeyword(searchRelatedKeyword).then(function(data){
		              var relateds = [];
		              data.forEach(function(object){
		                object.data.forEach(function(obj){
		                  relateds.push(obj);
		                });
		              });
		              if(rest == 'put'){
		                scope.relatedsUpdate = relateds;
		              }
		              if(rest == 'post'){
		                scope.relateds = relateds;
		              }
		            });
		          }
		        };


			}
		}
	})
})();