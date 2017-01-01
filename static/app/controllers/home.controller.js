(function(){
    "use strict";
    angular
        .module("App")
        .controller("HomeController",HomeController);

    HomeController.$inject = ['homeService','sideBarService','taskBarService'];

    function HomeController(homeService,sideBarService,taskBarService){
        var vm = this;

        vm.service = homeService;
        vm.sidebar = sideBarService;
        vm.task = taskBarService;
    }
})();
