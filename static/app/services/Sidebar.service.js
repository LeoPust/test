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
            },
            projects = [];

        var service = {
            profile:profile,
            projects:projects,
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
            var vm = this;

            vm.projects = data.projects.map(function(item,i){
                item.status = false;
                return item;
            });
        }

        function setProfile(data){
            var vm = this;

            console.log(data);
            vm.profile.username = data.Account.username;
            vm.profile.image_url = data.Account.image_url;
        }
    }
})();

