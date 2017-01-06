(function(){
    "use strict";
    angular
        .module("App")
        .directive("preloaderStatus",preloaderStatus);

    function preloaderStatus(){
        var directive = {
            restrict:"EA",
            link:link
        };
        return directive;

        function link(scope,element,attrs){
            scope.$watch("vm.status",function(){
                if(scope.vm.status)element[0].classList.add("hide");
            })
        }
    }
})();
