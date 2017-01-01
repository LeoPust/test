(function(){
    "use strict";
    angular
        .module("App")
        .service("sideBarService",sideBarService);

    sideBarService.$inject = ['apiService'];

    function sideBarService(apiService){
        var profile = {
            username:"",
            image_url:""
        };

        var service = {
            profile:profile,
            getProfile:getProfile,
            getProjects:getProjects,
            setProfile:setProfile,
            setProjects:setProjects
        };

        return service;

        function getProfile(){
            var vm = this;

            apiService.getProfile()
                .then(function(data){
                    vm.setProfile(data);
                })
        }

        function getProjects(){
            var vm = this;

            apiService.getProjects()
                .then(function(data){
                    vm.setProjects(data);
                });
        }

        function setProjects(data){
            console.log(data);

            vm.projects = data.projects;
        }

        function setProfile(data){
            var vm = this;

            console.log(data);
            vm.profile.username = data.Account.username;
            vm.profile.image_url = data.Account.image_url;
        }
    }
})();
