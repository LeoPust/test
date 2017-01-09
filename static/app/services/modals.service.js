(function(){
    "use strict";
    angular
        .module("App")
        .service("modalsService",modalsService);

    modalsService.$inject = ['$state','sideBarService','taskBarService','apiService','moment'];

    function modalsService($state,sideBarService,taskBarService,apiService,moment){
        var projectCreate = {
                name:"",
                addProject:addProject,
                toDefault:toDefault
            },
            taskCreate = {
                name:"",
                description:"",
                addTask:addTask,
                toDefault:toDefault
            },
            taskViewing = {
                id:"",
                name:"",
                description:"",
                status:false,
                upd:{
                    name:"",
                    description:""
                },
                loadTask:loadTask,
                editStatus:editStatus,
                saveUpdate:saveUpdate,
                toDefault:toDefault
            };


        var service = {
            projectCreate:projectCreate,
            taskCreate:taskCreate,
            taskViewing:taskViewing,
            closeModal:closeModal
        };
        return service;

        function closeModal(section){
            var vm = this;
            if([section] in vm){
                vm[section].toDefault();
            }
            else{
                vm.projectCreate.toDefault();
                vm.taskCreate.toDefault();
                vm.taskViewing.toDefault();
            }
            $state.go("home");
        }

        function addProject(){
            var vm = this;
            if(!vm.name)return;
            apiService.addProject(vm.name)
                .then(function(data){
                    sideBarService.addToList(vm.name,data.Project.id);
                    vm.toDefault();
                    $state.go("home");
                });
        }

        function addTask(){
            var vm = this,
                id = sideBarService.getActiveProject();
            if(!vm.name || !id)return;
            
            return apiService.addTask(id,vm.name,vm.description)
                .then(function(data){
                    var d = moment(new Date()).format("DD.MM.YYYY"),
                        item = {
                        id:data.Task.id,
                        title:vm.name,
                        description:vm.description,
                        created_at:d
                    };
                    taskBarService.addTask({Task:item});
                    sideBarService.taskIncrement();
                    vm.toDefault();
                    $state.go("home");
                });

        }

        function loadTask(id) {
            var vm = this;
            vm.status = false;
            apiService.loadInfoTask(id)
                .then(function(data){
                    vm.name = data.Task.title;
                    vm.description = data.Task.description;
                    vm.id = data.Task.id;
                });
        }

        function editStatus(){
            var vm = this;

            vm.upd.name = vm.name;
            vm.upd.description = vm.description;
            vm.status = true;
        }

        function saveUpdate(){}

        function toDefault(){
            var vm = this;
            for(var i in vm){
                switch (typeof(vm[i])){
                    case "string":
                        vm[i] = "";
                        break;
                    case "number":
                        vm[i] = null;
                        break;
                }
            }
        }
    }
})();
