(function(){
    "use strict";
    angular
        .module("App")
        .service("modalsService",modalsService);

    modalsService.$inject = ['$state'];

    function modalsService($state){
        var projectCreate = {
                name:"",
                addProject:addProject
            },
            taskCreate = {

            },
            taskViewing = {

            };


        var service = {
            projectCreate:projectCreate,
            taskCreate:taskCreate,
            taskViewing:taskViewing,
            closeModal:closeModal
        };
        return service;

        function closeModal(section){
            console.log(section);
            $state.go("home");
        }

        function addProject(){}
    }
})();
