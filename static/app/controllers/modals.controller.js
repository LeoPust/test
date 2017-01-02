(function(){
    "use strict";
    angular
        .module("App")
        .controller("ModalsController",ModalsController);

    ModalsController.$inject = ['modalsService'];

    function ModalsController(modalsService){
        var vm = this;

        vm.project = modalsService.projectCreate;
        vm.new_task = modalsService.taskCreate;
        vm.task = modalsService.taskViewing;

    }
})();
