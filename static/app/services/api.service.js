(function(){
    "use strict";
    angular
        .module("App")
        .service("apiService",apiService);

    apiService.$inject = ['$http','$log','$cookies','URLs'];

    function apiService($http,$log,$cookies,URLs){


        var service = {
            getProfile:getProfile,
            checkSession:checkSession,
            signUp:signUp,
            resultSucceed:resultSucceed,
            XHRFailed:XHRFailed
        };
        return service;

        function getProfile(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH;

            return $http({
                url:url + "/account",
                method:"GET",
                params:{session:$cookies.get("session")},
                paramSerializer: '$httpParamSerializerJQLike'
            })
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function checkSession(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH;

            return $http({
                url:url + "/session",
                method:"GET",
                params:{session:$cookies.get("session")},
                paramSerializer: '$httpParamSerializerJQLike'
            })
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function signUp(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH;
            
            return $http.post(url + "/signup")
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function resultSucceed(response){
            console.log(response.data);
            return response.data;
        }

        function XHRFailed(error) {
            $log.error('XHR Failed! ' + error.data);
        }
    }

})();
