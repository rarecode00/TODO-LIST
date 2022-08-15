let tasks = []

const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log("hello");

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="https://icon-library.com/images/delete-icon-png/delete-icon-png-19.jpg" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

function renderList(){
    taskList.innerHTML = '';

    for(let i = 0 ; i < tasks.length; i++){
           addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId){
    let ok = false;
     tasks.filter(function(task){
         if(task.id == taskId){
            task.done = !task.done;
            renderList();
            ok = true;
            return;
        }
    });
    
     if(ok) showNotification('Task toggled successfully');
     else showNotification('Could not toggle the task');
}

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
          return task.id != taskId;
    });
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }

    showNotification('Task can not be added');
}

function showNotification(text){
      alert(text);
}

function handleInputKeypress(event){
      if(event.key == 'Enter'){
          const text = event.target.value;

          if(!text){
            showNotification('Task text can not be empty');
            return;
          }

      console.log(text);

      const task = {
        text, 
        id: Date.now().toString(),
        done: false
      }

      event.target.value = '';
      addTask(task);
 }
}

function handleClick(event){
    const target = event.target;
    console.log(target);

    if(target.className == "delete"){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className == "custom-checkbox"){
        const taskId = target.id;
        toggleTask(taskId);
        if(taskId.done){
            
        }
        return;

    }
}

addTaskInput.addEventListener('keyup' , handleInputKeypress);

document.addEventListener('click' , handleClick);
