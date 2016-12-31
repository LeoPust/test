(function(){
    "use strict";
    angular
        .module("App")
        .config(Config);

    Config.$inject = ['$locationProvider','$urlRouterProvider','$stateProvider'];

    function Config($locationProvider,$urlRouterProvider,$stateProvider){
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('home',{
                url:"/",
                templateUrl:"template/pages/home.page.html",
                controller:"HomeController",
                controllerAs:"vm"
            })
    }
})();
