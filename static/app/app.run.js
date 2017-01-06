(function(){
    "use strict";
    angular
        .module("App")
        .run(Run);

    Run.$inject = ['$http'];

    function Run($http){
        $http.defaults.headers.post = {'Content-Type':'application/json'};
    }

})();
