;(function(win, doc) {

    var win = win;
    var doc = doc;


    var tasks = [
        {
            id: 1,
            title: "Task 1",
            completed: false
        },
        {
            id: 2,
            title: "Task 2",
            completed: true
        },
        {
            id: 3,
            title: "Task 3",
            completed: true
        },
        {
            id: 4,
            title: "Task 4",
            completed: false
        }
    ];

    var id = tasks.length;

    function Todo() {
        var self = this;

        this.todoFilter();
        this.initTask(tasks);
        this.createTask();

    }

    Todo.prototype.initTask = function initTask(tasks) {
        var todoList =  doc.querySelector("#todo-list");
        todoList.innerHTML = "";

        tasks.forEach(function(task) {
            var taskNode = doc.createElement("li");
            var spanNode = doc.createElement('button');
            var spanText = doc.createTextNode("Mark Done");
            spanNode.setAttribute('class', 'primary button task-button');


            if(task.completed) {
                taskNode.setAttribute('class', 'completed');
                var spanText = doc.createTextNode("Undo Task");
            }

            spanNode.appendChild(spanText);

            var taskText = doc.createTextNode(task.title);
            taskNode.setAttribute('data-id', task.id);
            taskNode.appendChild(taskText);
            taskNode.appendChild(spanNode);
            todoList.appendChild(taskNode);

            //console.log(task.title);
            //console.log(task.completed);
        });

        this.addToggleTaskEvent();
    };

    Todo.prototype.addToggleTaskEvent = function addToggleTaskEvent() {
        var taskButton = doc.querySelectorAll(".task-button");

        for(i = 0; i<taskButton.length; i++) {
            taskButton[i].addEventListener('click', toggleTask);
        }
    };

    Todo.prototype.toggleTask = function toggleTask() {
        //console.log(this);
        var taskId = parseInt(this.parentNode.getAttribute('data-id'));
        //console.log(taskId);

        var newTask = findTask(taskId);

        console.log(newTask);

        tasks.forEach(function (task) {
            if(task.id === newTask.id) {
                newTask.completed = !newTask.completed;
            }
        });


        this.initTask(tasks);

        console.log(tasks);
    };

    Todo.prototype.findTask = function findTask(taskId) {
        var singleTask = {};

        tasks.some(function(task) {
            singleTask = task;
            return task.id === taskId;
        });

        return singleTask;
    }

    Todo.prototype.todoFilter = function todoFilter() {
        var todoFilters = doc.querySelectorAll("#todo-controls li");

        for(i=0; i<todoFilters.length; i++) {
            todoFilters[i].addEventListener('click', filterTasks);
        }
    };

    Todo.prototype.filterTasks = function filterTasks() {
        //console.log(this);
        var filterBy = this.getAttribute("data-filter");
        var filter = "all";
        //console.log(filterBy);

        if(filterBy == "completed") {
            filter = true;
        } else if (filterBy == "uncompleted") {
            filter = false;
        }

        this.showFilteredTasks(filter);
    }

    Todo.prototype.showFilteredTasks = function showFilteredTasks(filter) {
        //console.log(filter);
        var filteredTasks = tasks;

        if(filter == "all") {
        } else {
            filteredTasks =  tasks.filter(function (task) {
                return task.completed == filter;
            });
        }

        this.initTask(filteredTasks);

    }



    Todo.prototype.addTask = function addTask(taskTitle) {
        taskTitle = taskTitle.trim();

        if(taskTitle) {
            var newTask = {
                id: id+1,
                title: taskTitle,
                completed: false
            };

            id++;

            tasks.push(newTask);

            //console.log(tasks);
            var taskNode = doc.createElement("li");
            var taskText = doc.createTextNode(taskTitle);
            taskNode.setAttribute('data-id', newTask.id);

            var spanNode = doc.createElement('button');
            var spanText = doc.createTextNode("Mark Done");
            spanNode.setAttribute('class', 'primary button task-button');
            spanNode.appendChild(spanText);

            taskNode.appendChild(taskText);
            taskNode.appendChild(spanNode);
            //console.log(task);
            doc.querySelector("#todo-list").appendChild(taskNode);

            this.addToggleTaskEvent();
            return true;
        }
        return false;
    };

    Todo.prototype.createTask = function createTask() {
        doc.getElementById("todo-form").addEventListener("submit", function(e) {
            e.preventDefault();
            var taskDom =  doc.getElementById("todo-form-input");
            var task = taskDom.value;
            var isAdded = addTask(task);

            if(isAdded) {
                taskDom.value = "";
                taskDom.focus();
            }
        });
    };

    // Export to window
    window.Todo = Todo;

}(window, document));