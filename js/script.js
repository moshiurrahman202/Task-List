// Define UI Element
let form = document.querySelector("#task-form");
let taskInput = document.querySelector("#new-task");
let filter = document.querySelector("#task-filter");
let taskList = document.querySelector("ul");
let clearBtn =  document.querySelector("#clear-task-btn");


// Define Even Listener
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTask);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTasks);

//Define function
// Add Task
function addTask(e){
    if(taskInput.value === ""){
        alert("Add a Task!");
    }else{
        let li =document.createElement("li");
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerHTML = "x";
        link.style.textDecoration = "none";
        link.style.color = "red";
        li.appendChild(link);
        taskList.appendChild(li);
        //invock for local storage
        storeTaskInLocalStorage(taskInput.value);
        // invocktion end
        taskInput.value = "";
    }
    e.preventDefault();
}

// Remove Task
function removeTask(e){
    if(e.target.hasAttribute("href")){
      if(confirm("Are you sure?")){
          e.target.parentElement.remove();
          //invock for remove task from local storage
          removeFromLocalStorage(e.target.parentElement);
      }
}}


//clear task
function clearTask(){
    // taskLilst.innerHTML = "";

    // faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear()
}

// Filter Task
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    })
}

//  Store task in locale storage
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// send task to dom from locale storage
function getTasks(){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(task => {
        let li =document.createElement("li");
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerHTML = "x";
        link.style.textDecoration = "none";
        link.style.color = "red";
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// define for remove task from local storage
function removeFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index) =>{
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}