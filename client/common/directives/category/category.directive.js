(function(){
	angular.module('app').directive('category', ['meanData', 
				function(meanData){
		return {
			restrict: 'E',
      		require: '?ngModel',
			scope: false,
      		templateUrl: '/common/directives/category/category.view.html',
      		link: function(scope, element, attr){
      			
      			scope.categorySetter = function(model){
      				scope.model_ = model;
      			};

      			scope.showCategories = function(group){
		          meanData.getCategoriesByGroup(group).then(function(res){
		            scope.categoriesOptions = res.data;
		          });
		        };
      		}
		}
	}]);
})();