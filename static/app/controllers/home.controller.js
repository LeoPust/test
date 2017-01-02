(function(){
    "use strict";
    angular
        .module("App")
        .controller("HomeController",HomeController);

    HomeController.$inject = ['$cookies','homeService','sideBarService','taskBarService'];

    function HomeController($cookies,homeService,sideBarService,taskBarService){
        var vm = this;

        vm.service = homeService;
        vm.sidebar = sideBarService;
        vm.task = taskBarService;
        vm.loadTasks = loadTasks;

        activate();

        function activate(){
            var session = $cookies.get("session");

            console.log(session);
            if(session){
                sideBarService.getProfile();
                sideBarService.getProjects();
            }
        }

        function loadTasks(index){
            var id = vm.sidebar.loadProjectId(index);

            vm.task.loadTask(id);
        }
    }
})();
