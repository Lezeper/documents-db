(function () {
  angular.module('app').service('authentication', ['$http', '$window', '$q',
   function ($http, $window, $q) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function () {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload;
      }
    };

    var login = function (user) {
      return $http.post('/api/login', user).success(function (data) {
        saveToken(data.token);
      })
    };

    var logout = function () {
      $window.localStorage.removeItem('mean-token');
    };

    return {
      login: login,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      logout: logout,
      getToken: getToken,
      saveToken: saveToken,

    }

  }])
  
})();