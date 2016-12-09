(function () {
  var app = angular.module('app');
  app.controller('homeCtrl', ['$scope', '$window', '$location', 'meanData', 'authentication',
    '$rootScope', function ($scope, $window, $location, meanData, authentication, $rootScope) {

      $scope.showSearchDropDown = false;
      $scope.curSelSearchKw = -1;
      $scope.isLoggedIn = authentication.isLoggedIn();
      $rootScope.inputing = 0;

      $scope.hostName = $location.protocol() + "://" + location.host;

      angular.element($window).on('click', function(){
        $scope.showSearchDropDown = false;
        $scope.$digest();
      });
      /* when mouse left click */
      $scope.clickSearch = function(){
        $scope.keywordBackup = $scope.keyword;
        $scope.$digest();
        $scope.doSearch(0);
      }

      $scope.setDataId = function(id){
        $scope.dataId = id;
      }

      $scope.setDataGroup = function(group){
        $scope.dataGroup = group;
      }
      /* when focus on each title (using up down arrow) */
      $scope.focusSearch = function(signal){
        var op = $scope.curSelSearchKw*1 + signal*1;
        var curSelSearchTitle = document.getElementById("search-" + op);
        if(curSelSearchTitle){
          $scope.setDataId(curSelSearchTitle.dataset.dataId);
          $scope.setDataGroup(curSelSearchTitle.dataset.dataGroup);
          var ori = document.getElementById("search-" + $scope.curSelSearchKw);
          if(ori){ ori.style.backgroundColor = null; }
          
          $scope.curSelSearchKw = $scope.curSelSearchKw*1 + signal*1;
          $rootScope.inputing = -1;
          $scope.keyword = curSelSearchTitle.dataset.title;
          $scope.keywordBackup = curSelSearchTitle.dataset.title;
          $scope.$digest();
          document.getElementById("search-" + op).style.backgroundColor = "#ccc";
        }
      }

      $scope.mouseEnterSearch = function(val){
        $rootScope.inputing = -1;
        $scope.keyword = val;
        $scope.$digest();
      }

      $scope.mouseLeaveSearch = function(){
        $rootScope.inputing = 0;
        $scope.keyword = $scope.keywordBackup;
        $scope.$digest();
      }

      function clearPanels(){
        $scope.filteredQuestions = null;
        $scope.filteredDocs = null;
        $scope.findedTile = null;
      }

      $scope.$watch('selector', function(){
        $rootScope.inputing = 0;
        $scope.keyword = "";
        clearPanels();
      });

      $scope.searchTitle = function(keyword){
        $rootScope.inputing = 0;
        if(keyword){
          $scope.showSearchDropDown = true;
          $scope.curSelSearchKw = -1;
          $scope.keywordBackup = keyword;
          $scope.hightlyKeyword = keyword;

          if($scope.selector == 'Doc'){
            meanData.getDocTitleByKeyword(keyword).then(function(res){
              $scope.findedTile = res.data;
            });
          }
          if($scope.selector == 'Quiz'){
            meanData.getQueTitleByKeyword(keyword).then(function(res){
              $scope.findedTile = res.data;
            });
          }
          if($scope.selector == 'All'){
            meanData.getRelatedByKeyword(keyword).then(function(res){
              var results = [];
              res.forEach(function(object){
                object.data.forEach(function(obj){
                  results.push(obj);
                });
              });
              $scope.findedTile = results;
              $scope.$digest();
            });
          }
        }else{
          $scope.showSearchDropDown = false;
        }
      };
      /* signal: 1-> if I enter the search keyword, then need to check whether is specific 
                  0-> because I select a specific keytitle, so is already specific
      */
      $scope.doSearch = function(signal){
        if($scope.keyword && $scope.selector){
          $scope.showSearchDropDown = false;
          $scope.currentPage = 1;
          if($scope.selector == 'Quiz'){
            if((signal == 1 && $scope.curSelSearchKw != -1) || signal == 0){ 
              meanData.getQueById($scope.dataId).then(function(res){
                res.data.showAnswer = true;
                $scope.updateQueList(res.data);
              });
            } else {
              meanData.getQuesByKeyword($scope.keyword).then(function (res){
                $scope.filteredQuestions = res.data;
                // $scope.totalItems = res.data.length;
                // $scope.updateQueList();
              });
            }
          }
          if($scope.selector == 'Doc'){
            if(signal == 1 && $scope.curSelSearchKw != -1 || signal == 0){
              meanData.getDocById($scope.dataId).then(function(res){
                res.data.showAnswer = true;
                $scope.updateDocList(res.data);
              });
            } else {
              meanData.getDocByKeyword($scope.keyword).then(function (res){
                $scope.filteredDocs = res.data;
                // $scope.totalItems = res.data.length;
                // $scope.updateDocList();
              });
            }
          }
          if($scope.selector == 'All'){
            $scope.clearQueList();
            $scope.clearDocList();
            if(signal == 1 && $scope.curSelSearchKw != -1 || signal == 0){
              if($scope.dataGroup == 'doc'){
                meanData.getDocById($scope.dataId).then(function(res){
                  res.data.showAnswer = true;
                  $scope.updateDocList(res.data);
                });
              }
              if($scope.dataGroup == 'que'){
                meanData.getQueById($scope.dataId).then(function(res){
                  res.data.showAnswer = true;
                  $scope.updateQueList(res.data);
                });
              }
            } else {
              meanData.getDocByKeyword($scope.keyword).then(function (res){
                $scope.filteredDocs = res.data;
              });
              meanData.getQuesByKeyword($scope.keyword).then(function (res){
                $scope.filteredQuestions = res.data;
              });
            }
          }
        }else{clearPanels();}
      };

    }]);
  app.directive('toFocus', function(){
    return {
      scope: false,
      restrict: "A",
      link: function(scope, elem, attr){
        elem.on('click', function(){
          scope.setDataId(attr.dataId);
          scope.setDataGroup(attr.dataGroup);
          scope.clickSearch();
        });
        elem.on('mouseenter', function(evt){
          scope.setDataId(attr.dataId);
          scope.setDataGroup(attr.dataGroup);
          scope.mouseEnterSearch(attr.title, evt);
        });
        elem.on('mouseleave', function(evt){
          scope.mouseLeaveSearch(evt);
        });
      }
    }
  });
  app.filter("titleDecorator",['$rootScope', function($rootScope){
    return function(t, k){
      var result = "";
      var title = t;

      var addStrong = function(title, keyword){
        var index = title.indexOf(keyword);
        if(index >= 0){
          var temp = title.substring(index+keyword.length);
          result += title.substring(0,index) + "<strong>"+keyword+"</strong>" 
          return temp;
        }
      }

      k.split(" ").forEach(function(str){
        var temp = addStrong(title, str);
        if(typeof temp !== 'undefined'){
          title = temp;
        }
        
      });
      
      return result + title;
    };
  }]);
  app.directive('searchFocus', function(){
    return {
      scope: false,
      restrict: "A",
      link: function(scope, elem, attr){
        elem.on('keydown', function(evt){
          if(evt.keyCode == 13){
            scope.doSearch(1);
          }
          if(evt.keyCode == 40 || evt.keyCode == 38){
            if(scope.showSearchDropDown){
              evt.preventDefault();
              if(evt.keyCode == 40){
                scope.focusSearch(1);
              }else{
                scope.focusSearch(-1);
              }
            }
          }
        });
      }
    }
  });
})();