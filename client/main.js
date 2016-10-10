(function () {
  angular.module('app', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngSanitize', 'ui.tinymce'])
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: '/home/home.view.html',
          controller: "homeCtrl"
        })
        .state('login/register', {
          url: '/login', // can't named "auth"
          templateUrl: "/auth/auth.view.html",
          controller: "loginCtrl"
        })
        .state('documents', {
          url: '/doc?id',
          templateUrl: "/document/document.view.html",
          controller: "docCtrl"
        })
        .state('questions', {
          url: '/q?id',
          templateUrl: "/question/question.view.html",
          controller: "questionsCtrl"
        });
        $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode(true);

  }]).controller('footerCtrl', ['$scope', function ($scope) {
    $scope.year = new Date().getFullYear();
  }]).controller('mainCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.prismHighlight = function(){
      Prism.highlightAll();
    };

    $rootScope.tinymceUsage = {
	  setup: function(editor){
		  editor.on('keydown', function(event){
			 if(event.keyCode == 9){
				 if(event.shiftKey){
					 editor.execCommand('Outdent');
				 }else{
					 editor.execCommand('Indent');
				 }
				 event.preventDefault();
				 return false;
			 } 
		  });
	  },
      height: 250,
      plugins: 'link image codesample advlist code preview',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | codesample | link image',
      valid_elements : '*[*]'
    };
    $rootScope.$on('onFinishRepeat', function(evt){
      $scope.prismHighlight();
    });
    
  }]).directive('onFinishRepeat', ['$timeout', function($timeout){
    return {
      restrict: 'A',
      link: function(scope, element, attr){
        if(scope.$last === true){
          $timeout(function(){
            scope.$emit(attr.onFinishRepeat);
          });
        }
      }
    }
  }]);
})();