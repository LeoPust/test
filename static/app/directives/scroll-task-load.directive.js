(function(){
    "use strict";
    angular
        .module("App")
        .directive("scrollTaskLoad",scrollTaskLoad);

    scrollTaskLoad.$inject = ['sideBarService','taskBarService'];

    function scrollTaskLoad(sideBarService,taskBarService){
        var directive = {
            restrict:"EA",
            link:link
        };
        return directive;

        function link(scope,element,attrs){
            for(var i = 0; i < element.length; i++){
                element[i].onscroll = scroll;
            }

            function scroll(){
                if(this.scrollTop >= this.scrollTopMax){
                    console.log("LOAD");
                }
            }
        }
    }
})();