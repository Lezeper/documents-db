(function () {
  angular.module('app').service('meanData', ['$http', '$q', function meanData($http, $q) {
    var serverUrl = "/api";
    /***** User *****/

    var getAllUsers = function () {
      return $http.get(serverUrl + '/user');
    };

    var getUserById = function (id) {
      return $http.get(serverUrl + '/user/' + id);
    };

    var createUser = function (newUser) {
      return $http.post(serverUrl + '/user', newUser, {});
    };

    var updateUser = function (updateUser) {
      return $http.put(serverUrl + '/user', updateUser, {});
    };

    var deleteUser = function (id) {
      return $http.delete(serverUrl + '/user?id=' + id, {});
    };

    /***** Question *****/

    var getQuesByCategory = function(category){
      return $http.get(serverUrl + '/que/c/' + category); 
    };

    var getQuestionByKeyword = function(keyword){
      return $http.get(serverUrl + '/s/q/' + keyword); 
    }

    var getQueById = function(id){
      return $http.get(serverUrl + '/que/id/' + id); 
    };

    var getQueCategories = function(){
      return $http.get(serverUrl + '/que/c');
    };

    var createQue = function (newQuestion) {
      return $http.post(serverUrl + '/que', newQuestion, {});
    };

    var updateQue = function (updateQuestion) {
      return $http.put(serverUrl + '/que', updateQuestion, {});
    };

    var deleteQue = function (id) {
      return $http.delete(serverUrl + '/que/id/' + id, {});
    };

    /***** Document *****/

    var getDocById = function(id){
      return $http.get(serverUrl + '/doc/id/' + id);
    };

    var getDocCategories = function(){
      return $http.get(serverUrl + '/doc/c');
    };

    var getDocByCategory = function(category){
      return $http.get(serverUrl + '/doc/c/' + category);
    };

    var createDoc = function(doc){
      return $http.post(serverUrl + '/doc', doc);
    };

    var updateDoc = function(doc){
      return $http.put(serverUrl + '/doc', doc);
    };

    var deleteDoc = function(id){
      return $http.delete(serverUrl + '/doc/id/' + id);
    }

    var getDocTitleByKeyword = function(keyword){
      return $http.get(serverUrl + '/s/d/' + keyword + "?need=title");
    }

    var getDocByKeyword = function(keyword){
      return $http.get(serverUrl + '/s/d/' + keyword + "?need=");
    }

    /***** Category *****/
    var getCategories = function(){
      return $http.get(serverUrl + '/cat');
    }

    var getCategoriesByGroup = function(group){
      return $http.get(serverUrl + '/cat/' + group);
    }

    var createCategory = function(cat){
      return $http.post(serverUrl + '/cat', cat);
    }

    var updateCategory = function(cat){
      return $http.put(serverUrl + '/cat', cat);
    }

    var deleteCategory = function(id){
      return $http.delete(serverUrl + '/cat/id/' + id);
    }

    /***** Count *****/
    var getDocCountsByCategory = function(category){
      return $http.get(serverUrl + '/count/doc/' + category);
    }

    var getQueCountsByCategory = function(category){
      return $http.get(serverUrl + '/count/que/' + category);
    }

    var getRelatedByKeyword = function(keyword){
      var p =new Promise(function(resolve, reject){
        $q.all([
          $http.get(serverUrl + '/s/d/' + keyword + "?need=title+group"),
          $http.get(serverUrl + '/s/q/' + keyword + "?need=title+group")
        ]).then(function(res){
          resolve(res);
        });
      });
      return p;
    }

    return {
      getAllUsers: getAllUsers,
      createUser: createUser,
      updateUser: updateUser,
      deleteUser: deleteUser,
      getUserById: getUserById,

      getQueById: getQueById,
      getQueCategories: getQueCategories,
      getQuesByCategory: getQuesByCategory,
      createQue: createQue,
      updateQue: updateQue,
      deleteQue: deleteQue,

      getDocById: getDocById,
      getDocCategories: getDocCategories,
      getDocByCategory: getDocByCategory,
      createDoc: createDoc,
      updateDoc: updateDoc,
      deleteDoc: deleteDoc,

      getCategories: getCategories,
      getCategoriesByGroup: getCategoriesByGroup,
      createCategory: createCategory,
      updateCategory: updateCategory,
      deleteCategory: deleteCategory,

      getQuestionByKeyword: getQuestionByKeyword,
      getDocTitleByKeyword: getDocTitleByKeyword,
      getDocByKeyword: getDocByKeyword,
      getRelatedByKeyword: getRelatedByKeyword,

      getDocCountsByCategory: getDocCountsByCategory,
      getQueCountsByCategory: getQueCountsByCategory
    }
  }])
})();