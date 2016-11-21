(function () {
  angular.module('app').service('meanData', ['$http', '$q', 'authentication',
   function meanData($http, $q, authentication) {
    var serverUrl = "/api";
    var auth = {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
    };
    /***** User *****/

    var getAllUsers = function () {
      return $http.get(serverUrl + '/user');
    };

    var getUserById = function (id) {
      return $http.get(serverUrl + '/user/' + id);
    };

    var createUser = function (newUser) {
      return $http.post(serverUrl + '/user', newUser, auth);
    };

    var updateUser = function (updateUser) {
      return $http.put(serverUrl + '/user', updateUser, auth);
    };

    var deleteUser = function (id) {
      return $http.delete(serverUrl + '/user?id=' + id, auth);
    };

    /***** Question *****/

    var getQuesByCategory = function(category){
      return $http.get(serverUrl + '/que/c/' + category); 
    };

    var getQueById = function(id){
      return $http.get(serverUrl + '/que/id/' + id); 
    };

    var getQueCategories = function(){
      return $http.get(serverUrl + '/que/c');
    };

    var createQue = function (newQuestion) {
      return $http.post(serverUrl + '/que', newQuestion, auth);
    };

    var updateQue = function (updateQuestion) {
      return $http.put(serverUrl + '/que', updateQuestion, auth);
    };

    var deleteQue = function (id) {
      return $http.delete(serverUrl + '/que/id/' + id, auth);
    };

    var getQueTitleByKeyword = function(keyword){
      return $http.get(serverUrl + '/s/q/' + keyword + "?need=title"); 
    };

    var getQuesByKeyword = function(keyword){
      return $http.get(serverUrl + '/s/q/' + keyword + "?need="); 
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
      return $http.post(serverUrl + '/doc', doc, auth);
    };

    var updateDoc = function(doc){
      return $http.put(serverUrl + '/doc', doc, auth);
    };

    var deleteDoc = function(id){
      return $http.delete(serverUrl + '/doc/id/' + id, auth);
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
      return $http.post(serverUrl + '/cat', cat, auth);
    }

    var updateCategory = function(cat){
      return $http.put(serverUrl + '/cat', cat, auth);
    }

    var deleteCategory = function(id){
      return $http.delete(serverUrl + '/cat/id/' + id, auth);
    }

    /***** Log *****/
    var getAllLogs = function(){
      return $http.get(serverUrl + '/log', auth);
    }

    var getLogsByIp = function(ip){
      return $http.get(serverUrl + '/log?ip=' + ip, auth)
    }

    var getLogsByDate = function(date){
      return $http.get(serverUrl + '/log?date=' + date, auth);
    }

    var deleteAllLogs = function(){
      return $http.delete(serverUrl + '/log', auth);
    }

    /***** Settings *****/
    var getSettings = function(){
      return $http.get(serverUrl + '/settings', auth);
    }

    var doDBBackup = function(){
      return $http.get(serverUrl + '/settings/dbbu', auth);
    }

    var updateSettings = function(settings){
      return $http.put(serverUrl + '/settings', settings, auth);
    }

    var deleteSettings = function(){
      return $http.delete(serverUrl + '/settings', auth);
    }

    /***** Count *****/
    var getDocCountsByCategory = function(category){
      return $http.get(serverUrl + '/count/doc/' + category);
    }

    var getQueCountsByCategory = function(category){
      return $http.get(serverUrl + '/count/que/' + category);
    }

    var getDocCounts = function(){
      return $http.get(serverUrl + '/count/doc');
    }

    var getQueCounts = function(){
      return $http.get(serverUrl + '/count/que');
    }

    var getQueCountsByAnswer = function(answer){
      return $http.get(serverUrl + '/count/que/all/' + answer);
    }

    /***** Others *****/
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

      getQueTitleByKeyword: getQueTitleByKeyword,
      getDocTitleByKeyword: getDocTitleByKeyword,
      getQuesByKeyword: getQuesByKeyword,
      getDocByKeyword: getDocByKeyword,
      getRelatedByKeyword: getRelatedByKeyword,

      getAllLogs: getAllLogs,
      getLogsByIp: getLogsByIp,
      getLogsByDate: getLogsByDate,
      deleteAllLogs: deleteAllLogs,

      getDocCountsByCategory: getDocCountsByCategory,
      getQueCountsByCategory: getQueCountsByCategory,
      getDocCounts: getDocCounts,
      getQueCounts: getQueCounts,
      getQueCountsByAnswer: getQueCountsByAnswer,

      getSettings: getSettings,
      updateSettings: updateSettings,
      deleteSettings: deleteSettings,

      doDBBackup: doDBBackup
    }
  }])
})();