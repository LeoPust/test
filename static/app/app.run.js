(function(){
    "use strict";
    angular
        .module("App")
        .run(Run);

    Run.$inject = ['$cookies','$http','ApiService'];

    function Run($cookies,$http,ApiService){
        var token = $cookies.get("token");

        $http.defaults.headers.post = {'Content-Type':'application/json'};

        if(token){
            // проверка и получение профиля
            ApiService.checkSession()
                .then(ApiService.getProfile)
                .then();
        }else{
            // создание нового пользователя
            ApiService.signUp()
                .then();
        }
    }

})();
