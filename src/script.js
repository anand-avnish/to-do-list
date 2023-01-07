let addTask = document.querySelector('.add-task')
let addTaskButton = document.querySelector('.add-task-button')
let AddForm = document.querySelector('.add-form')
let AddButton = document.querySelector('.add-button')
let CloseButton = document.querySelector('.close-button')
let taskList = document.querySelector('.task-list')
let deleteButton = document.querySelector('.del')
let taskNameInput = document.getElementById("taskName");
let statusInput = document.getElementById("status");

let arrayOfTasks =[];
let lastId=0;

if(window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
getTaskFromLocalStorage();

function addTaskToArray (task,status) {
    const taskObject = {
        id : ++lastId,
        taskName : task,
        status : status,
    };
    // console.log(taskObject);
    arrayOfTasks.push(taskObject);
    let tasks=sortTasks(arrayOfTasks);
    addTaskToPage(tasks);
    addTaskToLocalStorage(arrayOfTasks);
}

function sortTasks(tasks){
    // console.log(tasks);
    let completed = tasks.filter(task=>task.status=="Completed")
    let progress = tasks.filter(task=>task.status=="InProgress")
    let todo = tasks.filter(task=>task.status=="Todo")
    tasks = progress.concat(todo,completed)
    return tasks;
}

addTaskButton.addEventListener('click', function() {
    addTask.classList.toggle('hidden')
    AddForm.classList.toggle('hidden')
});

CloseButton.addEventListener('click', function() {
    taskNameInput.value=''
    statusInput.value=''
    addTask.classList.toggle('hidden')
    AddForm.classList.toggle('hidden')
});

AddButton.addEventListener('click', function() {
    let task = taskNameInput.value;
    let status = statusInput.value;
    // console.log(status);
    if(task!==undefined&&status!=undefined){
        addTaskToArray(task,status);
        taskNameInput.value=''
        statusInput.value=''
    }
    addTask.classList.toggle('hidden')
    AddForm.classList.toggle('hidden')
});

function addTaskToLocalStorage(arrayOfTasks){
    // console.log(JSON.stringify(arrayOfTasks));
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getTaskFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data);
        tasks = sortTasks(tasks)
        // console.log(tasks);
        addTaskToPage(tasks);
    }
}

taskList.onclick = ((e) => {
    // console.log("On click",e.target.classList);
    if (e.target.classList.contains("del")) {
        // console.log("In del");
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("id"));
        e.target.parentElement.remove();
    }else if(e.target.classList.contains("edit")){
        // console.log("In Edit");
        addTaskButton.click();
        taskNameInput.value=e.target.parentElement.getAttribute("tName")
        statusInput.value=e.target.parentElement.getAttribute("tStatus")
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("id"));
        e.target.parentElement.remove();
    }
})
function addTaskToPage(tasks){
    taskList.innerHTML=''
    // tasks.forEach(task=>{
    //     var tr = "<tr id=\""+ task.id +"\" tName=\""+ task.taskName +"\" tStatus=\""+ task.status +"\" class=\"mt-2\">";
    //     // tr += "<td>" + task.id + "</td>";
    //     tr += "<td>" + task.taskName + "</td>";
    //     if(task.status=="Completed"){
    //         tr += "<td><span class=\"border-2 text-green-600 rounded-lg border-green-600 p-1\">" + task.status + "</span></td>";
    //     }else if(task.status=="In Progress"){
    //         tr += "<td><span class=\"border-2 text-yellow-600 rounded-lg border-yellow-600 p-1\">" + task.status + "</span></td>";
    //     }else{
    //         tr += "<td><span class=\"border-2 text-grey-600 rounded-lg border-grey-600 p-1\">" + task.status + "</span></td>";
    //     }
    //     // tr += "<td class=\"edit cursor-pointer border-2 text-cyan-600 rounded-lg border-cyan-600 p-1 edit\">" + "Edit" + "</td>";
    //     tr += "<td class=\"edit cursor-pointer material-symbols-outlined text-cyan-600 p-1 edit\">" + "edit" + "</td>";
    //     tr += "<td class=\"del cursor-pointer material-symbols-outlined text-center text-red-600 p-1\">" + "delete" + "</td>";
    //     //"<span class=\"material-symbols-outlined\">edit</span>"
    //     taskList.innerHTML += tr;
    //     lastId=task.id;
    // })
    tasks.forEach(task=>{
        var tr = "<div id=\""+ task.id +"\" tName=\""+ task.taskName +"\" tStatus=\""+ task.status +"\" class=\"flex border-b border-black justify-center flex-wrap font-base p-1 mt-1\">";
        tr += "<span class=\"w-7/12 font-bold text-lg\">" + task.taskName + "</span>";
        if(task.status=="Completed"){
            tr += "<span class=\"w-3/12 min-w-min\"><span class=\"bg-green-600 rounded-lg text-white py-1 px-2\">" + task.status + "</span></span>";
        }else if(task.status=="InProgress"){
            tr += "<span class=\"w-3/12 min-w-min\"><span class=\"bg-yellow-600 rounded-lg text-white p-1 px-2\">" + task.status + "</span></span>";
        }else{
            tr += "<span class=\"w-3/12 min-w-min\"><span class=\"bg-gray-600 rounded-lg text-white p-1 px-2\">" + task.status + "</span></span>";
        }
        // tr += "<td class=\"edit cursor-pointer border-2 text-cyan-600 rounded-lg border-cyan-600 p-1 edit\">" + "Edit" + "</td>";
        tr += "<span class=\"edit w-1/12 min-w-min cursor-pointer material-symbols-outlined text-cyan-600 p-1 edit\">" + "edit" + "</span>";
        tr += "<span class=\"del w-1/12 min-w-min cursor-pointer material-symbols-outlined text-center text-red-600 p-1\">" + "delete" + "</span>";
        taskList.innerHTML += tr;
        if(task.id>lastId)
            lastId=task.id;
    })
}

function deleteTaskFromLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTaskToLocalStorage(arrayOfTasks);
}