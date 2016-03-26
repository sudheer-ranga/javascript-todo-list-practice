;(function(win, doc) {

    var win = win;
    var doc = doc;

    var tasks = [
        {
            title: "Task 1",
            completed: false
        },
        {
            title: "Task 2",
            completed: true
        },
        {
            title: "Task 3",
            completed: true
        },
        {
            title: "Task 4",
            completed: false
        }
    ];

    var initTask = function initTask(tasks) {
        var todoList =  doc.querySelector("#todo-list");
        todoList.innerHTML = "";

        tasks.forEach(function(task, i) {
            //for (var t in task) {
            //    //console.log(t);
            //    if (Object.prototype.hasOwnProperty.call(task, t)) {
            //        if (t == "title") {
            //            //console.log(task[t]);
            //            var taskNode = doc.createElement("li");
            //            var taskText = doc.createTextNode(task.title);
            //            taskNode.appendChild(taskText);
            //            doc.querySelector("#todo-list").appendChild(taskNode);
            //        } else if (t == "completed") {
            //        }
            //    }
            //}

            var taskNode = doc.createElement("li");

            if(task.completed) {
                taskNode.setAttribute('class', 'completed');
            }

            var taskText = doc.createTextNode(task.title);
            taskNode.appendChild(taskText);
           todoList.appendChild(taskNode);

            //console.log(task.title);
            console.log(task.completed);
        });
    };

    var todoFilter = function todoFilter() {
        doc.querySelector("#all-task").addEventListener('click', showAllTasks);
        doc.querySelector("#completed-task").addEventListener('click', showCompletedTasks);
        doc.querySelector("#uncompleted-task").addEventListener('click', showUncompletedTasks);
    };

    var showAllTasks = function showAllTasks() {
        initTask(tasks);
    };

    var showCompletedTasks = function showCompletedTasks() {
        console.log("showing completed task");
        var completedTasks = tasks.filter(function(task) {
            return task.completed == true;
        });

        console.log(completedTasks);
        initTask(completedTasks);
    };

    var showUncompletedTasks = function showUncompletedTasks() {
        console.log("showing uncompleted task");

        var uncompletedTasks = tasks.filter(function(task) {
            return task.completed == false;
        });

        console.log(uncompletedTasks);
        initTask(uncompletedTasks);
    };

    todoFilter();

    var addTask = function addTask(task) {
        task = task.trim();

        if(task) {
            var newTask = {
                title: task,
                completed: false
            };

            tasks.push(newTask);

            console.log(tasks);
            var taskNode = doc.createElement("li");
            var taskText = doc.createTextNode(task);
            taskNode.appendChild(taskText);
            console.log(task);
            doc.querySelector("#todo-list").appendChild(taskNode);
            return true;
        }
        return false;
    };

    var createTask = function createTask() {
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

    initTask(tasks);
    createTask();

}(window, document));