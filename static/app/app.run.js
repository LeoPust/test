(function(){
    "use strict";
    angular
        .module("App")
        .run(Run);

    Run.$inject = ['$cookies','$http','apiService','homeService'];

    function Run($cookies,$http,apiService,homeService){
        var session = $cookies.get("session");

        $http.defaults.headers.post = {'Content-Type':'application/json'};

        if(session){
            apiService.checkSession()
                .then(function(data){
                    if(data.session)$cookies.put("session",data.session);
                  //  homeService.loadData();
                });
        }else{
            apiService.signUp()
                .then(function(data){
                    if(data.session)$cookies.put("session",data.session);
                   // homeService.loadData();
                });
        }
    }

})();
