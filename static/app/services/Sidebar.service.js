(function(){
    "use strict";
    angular
        .module("App")
        .service("sideBarService",sideBarService);

    sideBarService.$inject = ['apiService'];

    function sideBarService(apiService){
        var profile = {
                username:"",
                image_url:""
            },
            projects = [];

        var service = {
            profile:profile,
            projects:projects,
            getProfile:getProfile,
            getProjects:getProjects,
            setProfile:setProfile,
            setProjects:setProjects,
            loadProjectId:loadProjectId,
            addToList:addToList,
            getActiveProject:getActiveProject,
            taskIncrement:taskIncrement
        };

        return service;

        function getProfile(){
            var vm = this;

            apiService.getProfile()
                .then(function(data){
                    vm.setProfile(data);
                })
        }

        function getProjects(){
            var vm = this;

            apiService.getProjects()
                .then(function(data){
                    vm.setProjects(data);
                });
        }

        function setProjects(data){
            var vm = this;

            vm.projects = data.projects.map(function(item,i){
                item.status = false;
                return item;
            });
        }

        function setProfile(data){
            var vm = this;

            console.log(data);
            vm.profile.username = data.Account.username;
            vm.profile.image_url = data.Account.image_url;
        }
        
        function loadProjectId(index){
            var vm = this;
            for(var i in vm.projects){
                vm.projects[i].status = false;
            }
            vm.projects[index].status = true;
            return vm.projects[index].Project.id;
        }

        function addToList(name,id){
            var vm = this;
            vm.projects.push({
                Project:{
                    id:id,
                    title:name,
                    task_count:0
                },
                status:false
            });
        }

        function getActiveProject(){
            var vm = this;
            for(var i in vm.projects){
                if(vm.projects[i].status){
                    return vm.projects[i].Project.id;
                }
            }
            return null;
        }

        function taskIncrement(){
            var vm = this;
            vm.projects.forEach(function(item){
                if(item.status){
                    item.Project.task_count++;
                }
            })
        }
    }
})();

