(function(){
    "use strict";
    angular
        .module("App")
        .controller("HomeController",HomeController);

    HomeController.$inject = ['homeService','profileService'];

    function HomeController(homeService,profileService){
        var vm = this;

        vm.window = homeService.window;
    }
})();
