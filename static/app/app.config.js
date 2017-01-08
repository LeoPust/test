(function(){
    "use strict";
    angular
        .module("App")
        .config(Config);

    Config.$inject = ['$locationProvider','$urlRouterProvider','$stateProvider'];

    function Config($locationProvider,$urlRouterProvider,$stateProvider){
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/404');
        $stateProvider
            .state('home',{
                url:"/",
                templateUrl:"template/pages/home.page.html",
                controller:"HomeController",
                controllerAs:"vm"
            })
            .state("home.create-project",{
                url:"project/create",
                templateUrl:"template/modals/project.modal.html",
                controller:"ModalsController",
                controllerAs:"vm"
            })
            .state("home.create-task",{
                url:"task/create",
                templateUrl:"template/modals/task-create.modal.html",
                controller:"ModalsController",
                controllerAs:"vm"
            })
            .state("home.task-viewing",{
                url:"task/:id",
                templateUrl:"template/modals/task-viewing.modal.html",
                controller:"ModalsController",
                controllerAs:"vm"
            })
    }
})();
