(function(){
    "use strict";
    angular
        .module("App")
        .controller("ModalsController",ModalsController);

    ModalsController.$inject = ['$stateParams','modalsService'];

    function ModalsController($stateParams,modalsService){
        var vm = this;

        vm.project = modalsService.projectCreate;
        vm.new_task = modalsService.taskCreate;
        vm.task = modalsService.taskViewing;
        vm.service = modalsService;

        activate();

        function activate(){
            if($stateParams.id){
                vm.task.loadTask();
            }
        }
    }
})();
