(function () {
  var app = angular.module('app');
  app.controller('homeCtrl', ['$scope', '$window', '$location', 'meanData', 'authentication',
    function ($scope, $window, $location, meanData, authentication) {

      $scope.showSearchDropDown = false;
      $scope.curSelSearchKw = -1;
      $scope.isLoggedIn = authentication.isLoggedIn();

      $scope.hostName = $location.protocol() + "://" + location.host;

      angular.element($window).on('click', function(){
        $scope.showSearchDropDown = false;
        $scope.$digest();
      });

      $scope.clickSearch = function(){
        $scope.keywordBackup = $scope.keyword;
        $scope.$digest();
        $scope.doSearch(0);
      }

      $scope.setDataId = function(id){
        $scope.dataId = id;
      }
      
      $scope.focusSearch = function(signal){
        var op = $scope.curSelSearchKw*1 + signal*1;
        var curSelSearchTitle = document.getElementById("search-" + op);
        $scope.setDataId(curSelSearchTitle.dataset.dataId);
        if(curSelSearchTitle){
          var ori = document.getElementById("search-" + $scope.curSelSearchKw);
          if(ori){ ori.style.backgroundColor = null; }
          curSelSearchTitle.style.backgroundColor = "#ccc";

          $scope.curSelSearchKw = $scope.curSelSearchKw*1 + signal*1;
          $scope.keyword = curSelSearchTitle.text;
          $scope.keywordBackup = curSelSearchTitle.text;
          $scope.$digest();
        }
      }

      $scope.mouseEnterSearch = function(val){
        $scope.keyword = val;
        $scope.$digest();
      }

      $scope.mouseLeaveSearch = function(){
        $scope.keyword = $scope.keywordBackup;
        $scope.$digest();
      }

      function clearPanels(){
        $scope.filteredQuestions = null;
        $scope.filteredDocs = null;
      }

      $scope.$watch('selector', function(){
        $scope.keyword = "";
        clearPanels();
      });

      $scope.searchTitle = function(keyword){
        if(keyword){
          $scope.showSearchDropDown = true;
          $scope.curSelSearchKw = -1;
          $scope.keywordBackup = keyword;

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
                $scope.questions = res.data;
                $scope.totalItems = res.data.length;
                $scope.updateQueList();
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
                $scope.docs = res.data;
                $scope.totalItems = res.data.length;
                $scope.updateDocList();
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
          scope.clickSearch();
        });
        elem.on('mouseenter', function(evt){
          scope.setDataId(attr.dataId);
          scope.mouseEnterSearch(attr.toFocus, evt);
        });
        elem.on('mouseleave', function(evt){
          scope.mouseLeaveSearch(evt);
        });
      }
    }
  });
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