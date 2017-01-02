(function(){
    "use strict";
    angular
        .module("App")
        .filter("dateFormat",dateFormat);

    function dateFormat(){
        return function(item){
            return item;
        }
    }
})();
