(function () {
  angular.module('app').controller('homeCtrl', ['$scope', '$window', '$location', 'meanData', 'authentication',
    function ($scope, $window, $location, meanData, authentication) {

      $scope.showSearchDropDown = false;

      $scope.hostName = $location.protocol() + "://" + location.host;

      angular.element($window).on('click', function(){
        $scope.showSearchDropDown = false;
        $scope.$digest();
      });

      $scope.clickSearch = function(){
        $scope.keywordBackup = $scope.keyword;
        $scope.$digest();
        $scope.doSearch();
      }

      $scope.focusSearch = function(val){
        $scope.keyword = val;
        $scope.keywordBackup = val;
        $scope.$digest();
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

      $scope.meanData = meanData;

      $scope.$watch('selector', function(){
        $scope.keyword = "";
        clearPanels();
      });

      $scope.searchTitle = function(){
        if($scope.keyword){
          $scope.showSearchDropDown = true;
          $scope.keywordBackup = $scope.keyword;
          meanData.getDocTitleByKeyword($scope.keyword).then(function(res){
            $scope.docsTile = res.data;
          });
        }  
      };
      
      $scope.doSearch = function(){
        if($scope.keyword && $scope.selector){
          $scope.showSearchDropDown = false;
          if($scope.selector == 'Quiz'){
            meanData.getQuestionByKeyword($scope.keyword).then(function (res){
              $scope.questions = res.data;
              $scope.totalItems = res.data.length;
              $scope.currentPage = 1;
              $scope.updateQuestionList();
            });
          }
          if($scope.selector == 'Doc'){
            meanData.getDocByKeyword($scope.keyword).then(function (res){
              $scope.docs = res.data;
              $scope.totalItems = res.data.length;
              $scope.currentPage = 1;
              $scope.updateDocList();
            });
          }
        }else{clearPanels();}
      };
      
    }]);
  angular.module('app').directive('toFocus', function(){
    return {
      scope: false,
      restrict: "A",
      link: function(scope, elem, attr){
        // scope.keyword = attr.toFocus;
        elem.on('click', function(){
          scope.clickSearch();
        });
        elem.on('mouseenter', function(){
          scope.mouseEnterSearch(attr.toFocus);
        });
        elem.on('mouseleave', function(){
          scope.mouseLeaveSearch();
        });
        elem.on('focus', function(){
          scope.focusSearch(attr.toFocus);
        });
      }
    }
  });
  angular.module('app').directive('searchFocus', function(){
    return {
      scope: false,
      restrict: "A",
      link: function(scope, elem, attr){
        elem.on('keydown', function(val){
          if(val.keyCode == 40 || val.keyCode == 38){
            if(scope.showSearchDropDown){
              document.getElementById("search-0").focus();
            }
          }
        });
      }
    }
  });
})();