(function () {
  angular.module('app').service('meanData', ['$http', '$q', function meanData($http, $q) {

    var getAllUsers = function () {
      return $http.get('/api/user');
    };

    var getUserById = function (id) {
      return $http.get('/api/user/' + id);
    };

    var createUser = function (newUser) {
      return $http.post('/api/user', newUser, {});
    };

    var updateUser = function (updateUser) {
      return $http.put('/api/user', updateUser, {});
    };

    var deleteUser = function (id) {
      return $http.delete('/api/user?id=' + id, {});
    };

    var getQuestionsByCategory = function(category){
      return $http.get('/api/q/c/' + category); 
    };

    var getQuestionByKeyword = function(keyword){
      return $http.get('/api/s/q/' + keyword); 
    }

    var getQuestionById = function(id){
      return $http.get('/api/q/' + id); 
    };

    var getQuestionCategory = function(){
      return $http.get('/api/q');
    };

    var createQuestion = function (newQuestion) {
      return $http.post('/api/q', newQuestion, {});
    };

    var updateQuestion = function (updateQuestion) {
      return $http.put('/api/q', updateQuestion, {});
    };

    var deleteQuestion = function (id) {
      return $http.delete('/api/q/' + id, {});
    };

    var getDocById = function(id){
      return $http.get('/api/doc/id/' + id);
    };

    var getDocCategories = function(){
      return $http.get('/api/doc');
    };

    var getDocByCategory = function(category){
      return $http.get('/api/doc/c/' + category);
    };

    var createDoc = function(doc){
      return $http.post('/api/doc', doc);
    };

    var updateDoc = function(doc){
      return $http.put('/api/doc', doc);
    };

    var deleteDoc = function(id){
      return $http.delete('/api/doc/' + id);
    }

    var getDocTitleByKeyword = function(keyword){
      return $http.get('/api/s/d/' + keyword + "?need=title");
    }

    var getDocByKeyword = function(keyword){
      return $http.get('/api/s/d/' + keyword + "?need=");
    }

    var getRelatedByKeyword = function(keyword){
      var p =new Promise(function(resolve, reject){
        $q.all([
          $http.get('/api/s/d/' + keyword + "?need=title+group"),
          $http.get('/api/s/q/' + keyword + "?need=title+group")
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

      getQuestionById: getQuestionById,
      getQuestionCategory: getQuestionCategory,
      getQuestionsByCategory: getQuestionsByCategory,
      createQuestion: createQuestion,
      updateQuestion: updateQuestion,
      deleteQuestion: deleteQuestion,

      getDocById: getDocById,
      getDocCategories: getDocCategories,
      getDocByCategory: getDocByCategory,
      createDoc: createDoc,
      updateDoc: updateDoc,
      deleteDoc: deleteDoc,

      getQuestionByKeyword: getQuestionByKeyword,
      getDocTitleByKeyword: getDocTitleByKeyword,
      getDocByKeyword: getDocByKeyword,
      getRelatedByKeyword: getRelatedByKeyword
    }
  }])
})();