(function(){
    "use strict";
    angular
        .module("App")
        .directive("escKey",escKey);

    escKey.$inject = ['$state','$document','modalsService'];

    function escKey($state,$document,modalsService){
        var directive = {
            restrict:"EA",
            link:link
        };
        return directive;

        function link(scope,element,attrs){
            $document.bind("keydown keypress",function(event){
               if(event.which == 27){
                   scope.$apply(function(){
                        modalsService.closeModal(attrs.escKey);
                   });
                   event.preventDefault();
               }
            });
        }
    }
})();
