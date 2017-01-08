(function(){
    "use strict";
    angular
        .module("App")
        .service("taskBarService",taskBarService);

    taskBarService.$inject = ['apiService','moment'];

    function taskBarService(apiService,moment){
        var groups_tasks = [],
            paging_size = 50,
            paging_offset = 0,
            total_count = 0;

        var service = {
            groups_tasks:groups_tasks,
            paging_size:paging_size,
            paging_offset:paging_offset,
            total_count:total_count,
            compliteTask:compliteTask,
            loadTask:loadTask,
            addTask:addTask
        };
        return service;

        function addTask(task){
            var vm = this;
            for(var i in vm.groups_tasks){
                if(vm.groups_tasks[i].value == task.Task.created_at){
                    vm.groups_tasks[i].tasks.push(task);
                    return;
                }
            }
            vm.groups_tasks.push({
                tasks:[task],
                value:task.Task.created_at
            })
        }

        function loadTask(id){
            var vm = this,
                _groups_tasks = {};
            vm.groups_tasks = [];
            vm.paging_offset = 0;
            apiService.loadTask(id,vm.paging_size,vm.paging_offset)
                .then(function(data){
                    vm.total_count = data.total_count;
                    console.log(data.tasks);
                    for(var i in data.tasks){
                        var date = moment(data.tasks[i].Task.created_at,"YYYY-MM-DD hh:mm:ss").format("DD.MM.YYYY");
                        if([date] in _groups_tasks){
                            _groups_tasks[date]['tasks'].push(data.tasks[i]);
                        }else{
                            _groups_tasks[date] = {
                                tasks:[],
                                value:date
                            };
                            _groups_tasks[date]['tasks'].push(data.tasks[i]);
                        }
                    }
                    vm.groups_tasks = Object.keys(_groups_tasks).map(function(key){
                        return _groups_tasks[key];
                    });
                });
        }
        
        function compliteTask(id){
            var vm = this;

            apiService.comliteTask(id)
                .then(function () {

                    for(var i in vm.groups_tasks){
                        var _tasks = [];
                        for(var j in vm.groups_tasks[i].tasks){
                            vm.groups_tasks[i].tasks[j].Task.id != id ?
                                _tasks.push(vm.groups_tasks[i].tasks[j])
                            :null;
                        }
                        vm.groups_tasks[i].tasks = _tasks;
                    }
                });
        }
    }
})();
