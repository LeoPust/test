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
            if(section){
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
