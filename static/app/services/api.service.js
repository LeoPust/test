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
            getProjects:getProjects,
            loadTask:loadTask,
            addProject:addProject,
            resultSucceed:resultSucceed,
            XHRFailed:XHRFailed
        };
        return service;

        function getProfile(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH + "/account";

            return $http({
                url:url,
                method:"GET",
                params:{session:$cookies.get("session")},
                paramSerializer: '$httpParamSerializerJQLike'
            })
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function checkSession(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH + "/session";

            return $http({
                url:url,
                method:"GET",
                params:{session:$cookies.get("session")},
                paramSerializer: '$httpParamSerializerJQLike'
            })
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function signUp(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH  + "/signup";
            
            return $http.post(url)
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function getProjects(){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH + '/projects';

            return $http({
                    url:url,
                    method:"GET",
                    params:{session:$cookies.get("session")},
                    paramSerializer: '$httpParamSerializerJQLike'
                })
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function loadTask(id,paging_size,paging_offset){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH + '/tasks';

            return $http({
                url:url,
                method:"GET",
                params:{
                    session:$cookies.get("session"),
                    project_id:id,
                    paging_size:paging_size,
                    paging_offset:paging_offset
                },
                paramSerializer: '$httpParamSerializerJQLike'
            })
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function addProject(name){
            var vm = this,
                url = URLs.IP + URLs.PORT + URLs.PATH + '/projects/project';

            return $http({
                url:url,
                method:"POST",
                data:{
                    session:$cookies.get("session"),
                    Project:{
                        title:name
                    }
                },
                headers:{
                    "Content-Type":"application/json"
                }
            })
                .then(vm.resultSucceed)
                .catch(vm.XHRFailed);
        }

        function resultSucceed(response){
            return response.data;
        }

        function XHRFailed(error) {
            $log.error('XHR Failed! ' + error.data);
        }
    }

})();
