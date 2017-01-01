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
        },
            template = {
                sideBar:"template/components/sidebar.component.html",
                taskBar:"template/components/taskbar.component.html"
            };

        var service = {
            window:window,
            template:template
        };
        return service;
    }
})();
