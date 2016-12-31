(function(){
    "use strict";
    angular
        .module("App")
        .service("homeService",homeService);

    function homeService(){
        var window = {
            status:"",
            get show(){
                this.status = '';
            },
            get hide(){
                this.status = '';
            }
        };

        var service = {
            window:window
        };
        return service;
    }
})();
