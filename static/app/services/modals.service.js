(function(){
    "use strict";
    angular
        .module("App")
        .service("modalsService",modalsService);

    modalsService.$inject = ['$state','sideBarService','apiService'];

    function modalsService($state,sideBarService,apiService){
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
            
            apiService.addTask(id,vm.name,vm.description)
                .then(function(data){
                    
                });

        }

        function toDefault(){
            var vm = this;
            for(var i in vm){
                if(typeof(vm[i]) == "string"){
                    vm[i] = "";
                }
            }
        }
    }
})();
