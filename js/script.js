// Define UI Element
let form = document.querySelector("#task-form");
let taskInput = document.querySelector("#new-task");
let filter = document.querySelector("#task-filter");
let taskLilst = document.querySelector("ul");
let clearBtn =  document.querySelector("#clear-task-btn");


// Define Even Listener
form.addEventListener("submit", addTask);
taskLilst.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTask);

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
        taskLilst.appendChild(li);
        taskInput.value = "";
    }
    e.preventDefault();
}

// Remove Task
function removeTask(e){
    if(e.target.hasAttribute("href")){
      if(confirm("Are you sure?")){
          e.target.parentElement.remove()
      }
}}


//clear task
function clearTask(){
    // taskLilst.innerHTML = "";

    // faster
    while(taskLilst.firstChild){
        taskLilst.removeChild(taskLilst.firstChild);
    }
}