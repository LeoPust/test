(function(){
    "use strict";
    angular
        .module("App")
        .service("sideBarService",sideBarService);

    function sideBarService(){
        var profile = {
            username:"",
            image_url:""
        };

        var service = {
            profile:profile,
            setProfile:setProfile
        };

        return service;

        function setProfile(data){
            var vm = this;

            vm.profile.username = data.Account.username;
            vm.profile.image_url = data.Account.image_url;
        }
    }
})();
