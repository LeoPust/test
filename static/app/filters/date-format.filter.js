(function(){
    "use strict";
    angular
        .module("App")
        .filter("dateFormat",dateFormat);

    dateFormat.$inject = ['moment'];

    function dateFormat(moment){
        return function(item){
            switch(true){
                case (item == moment(new Date()).format("DD.MM.YYYY")):
                    return "Today";
                    break;
                case (item == moment(new Date()).subtract(1,'days').format("DD.MM.YYYY")):
                    return "Tomorrow";
                    break;
                default:
                    return moment(new Date(item)).format("dddd") + " (" + moment(new Date(item)).format("DD.MM.YYYY") +")";
                    break;
            }
            return item;
        }
    }
})();
