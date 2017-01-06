(function(){
    "use strict";
    angular
        .module("App")
        .controller("HomeController",HomeController);

    HomeController.$inject = ['$cookies','$timeout','homeService','sideBarService','taskBarService','apiService'];

    function HomeController($cookies,$timeout,homeService,sideBarService,taskBarService,apiService){
        var vm = this;

        vm.status = false;
        vm.service = homeService;
        vm.sidebar = sideBarService;
        vm.task = taskBarService;
        vm.loadTasks = loadTasks;

        activate();

        function activate(){
            var session = $cookies.get("session");

            if(session){
                apiService.checkSession()
                    .then(function(data){
                        if(data.session)$cookies.put("session",data.session);
                        sideBarService.getProfile();
                        sideBarService.getProjects();
                        $timeout(function(){
                            vm.status = true;
                        },500);
                    });
            }else{
                apiService.signUp()
                    .then(function(data){
                        if(data.session)$cookies.put("session",data.session);
                        sideBarService.getProfile();
                        sideBarService.getProjects();
                        $timeout(function(){
                            vm.status = true;
                        },500);
                    });
            }
        }

        function loadTasks(index){
            var id = vm.sidebar.loadProjectId(index);

            vm.task.loadTask(id);
        }
    }
})();
