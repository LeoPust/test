(function(){
    "use strict";
    angular
        .module("App")
        .run(Run);

    Run.$inject = ['$cookies','$http','apiService','sideBarService','homeService'];

    function Run($cookies,$http,apiService,sideBarService,homeService){
        var session = $cookies.get("session");

        $http.defaults.headers.post = {'Content-Type':'application/json'};

        if(session){
            apiService.checkSession()
                .then(function(data){
                    if(data.session)$cookies.put("session",data.session);
                    return apiService.getProfile();
                })
                .then(function(data){
                    sideBarService.setProfile(data);
                    //homeService.window.show;
                });
        }else{
            apiService.signUp()
                .then(function(data){
                    $cookies.put("session",data.session);
                    return apiService.getProfile();
                })
                .then(function(data){
                    sideBarService.setProfile(data);
                    //homeService.window.show;
                });
        }
    }

})();
