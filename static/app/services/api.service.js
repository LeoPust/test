(function(){
    "use strict";
    angular
        .module("App")
        .service("ApiService",ApiService);

    ApiService.$inject = ['$http','$log','URLs'];

    function ApiService($http,$log,URLs){


        var service = {
            getProfile:getProfile,
            checkSession:checkSession,
            signUp:signUp,
            resultSucced:resultSucced,
            XHRFailed:XHRFailed
        };
        return service;

        function getProfile(){}

        function checkSession(){}

        function signUp(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH;
            
            return $http.post(url + "/")
                .then(vm.resultSucced)
                .catch(vm.XHRFailed);
        }

        function resultSucced(response){
            return response.data;
        }

        function XHRFailed(error) {
            $log.error('XHR Failed! ' + error.data);
        }
    }

})();
