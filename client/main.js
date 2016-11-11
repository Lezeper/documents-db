(function () {
  var app = angular.module('app', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngSanitize', 'ui.tinymce']);
  
  app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: '/home/home.view.html',
          controller: "homeCtrl"
        })
        .state('login', {
          url: '/login', // can't named "auth"
          templateUrl: "/auth/auth.view.html",
          controller: "loginCtrl"
        })
        .state('dataNav', {
          url: '/nav/:group',
          templateUrl: "/data_nav/data.nav.view.html",
          controller: "dataNavCtrl"
        })
        .state('documentsByCategory', {
          url: '/doc/:mainCategory/:category',
          templateUrl: "/document/document.view.html",
          controller: "docCtrl"
        })
        .state('specific_document', {
          url: '/doc?id',
          templateUrl: "/document/document.view.html",
          controller: "docCtrl"
        })
        .state('questionByCategory', {
          url: '/que/:mainCategory/:category',
          templateUrl: "/question/question.view.html",
          controller: "queCtrl"
        })
        .state('specific_question', {
          url: '/que?id',
          templateUrl: "/question/question.view.html",
          controller: "queCtrl"
        })
        .state('admin', {
          url: '/admin/',
          templateUrl: "/admin/admin.view.html",
          controller: "adminCtrl"
        })
        .state('admin.overviews', {
          url: 'overviews/',
          templateUrl: "/admin/overviews/admin.overviews.view.html",
          controller: "adminOverviewsCtrl"
        })
        .state('admin.users', {
          url: 'users/',
          templateUrl: "/admin/users/admin.users.view.html",
          controller: "adminUsersCtrl"
        })
        .state('admin.access', {
          url: 'access/',
          templateUrl: "/admin/access/admin.access.view.html",
          controller: "adminAccessCtrl"
        })
        .state('admin.settings', {
          url: 'settings/',
          templateUrl: "/admin/settings/admin.settings.view.html",
          controller: "adminSettingsCtrl"
        })
        .state('admin.mg', {
          url: 'mg/',
          templateUrl: "/admin/mg/admin.mg.view.html",
          controller: "adminMgCtrl"
        })

        $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode(true);

  }]);

  app.controller('footerCtrl', ['$scope', 'meanData', '$rootScope',
        function ($scope, meanData, $rootScope) {
    $scope.year = new Date().getFullYear();
    meanData.getSettings().then(function(res){
      if(res.data.length == 1){
        $rootScope.settings = res.data[0];
      }
    }); 
  }]);

  app.controller('mainCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
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
    
  }]);

  app.directive('onFinishRepeat', ['$timeout', function($timeout){
    return {
      restrict: 'A',
      link: function(scope, element, attr){
        if(scope.$last === true){
          $timeout(function(){
            scope.$emit(attr.onFinishRepeat);
            scope.prismHighlight();
          });
        }
      }
    }
  }]);

  app.directive('subCatCounts', function(){
    return function(scope, element, attrs){
      if(scope.group == 'doc'){
        scope.meanData.getDocCountsByCategory(attrs.subCatCounts)
                          .then(function(result){
          element.html(result.data);
        });
      }
      if(scope.group == 'que'){
        scope.meanData.getQueCountsByCategory(attrs.subCatCounts)
                          .then(function(result){
          element.html(result.data);
        });
      }
    };
  });

  app.run(['$transitions', '$state', 'authentication', 
          function($transitions, $state, authentication){
    $transitions.onStart({}, function($transitions){

      if($transitions.$to().name.indexOf('admin') >= 0){
        if(!authentication.isLoggedIn())
          $state.go('login');
      }
      
    });
  }]);
})();