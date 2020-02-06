
const input = document.querySelector('#txtTaskName');
const button = document.querySelector('#btnAddNewTask');
const ul = document.querySelector('#task-list');
const deleteButton = document.querySelector('#btnDeleteAll');

let taskList ;

taskListFunc(); //call local Stroge Task List

eventListeners(); //Call event listeners

function eventListeners(){
    button.addEventListener('click',addNewItem); //add to item
    ul.addEventListener('click',deleteItem); //delete to item
    deleteButton.addEventListener('click',deleteAll); //delete all items
}

function deleteAll() {
    //1. method
    if (confirm('Are you sure ?')) {
        ul.innerHTML = '';
        localStorage.removeItem('taskList');
    }
    else{}
    //2. method
    // ul.childNodes.forEach(function (item) {
    //     item.remove();
    // })
}

function deleteItem(x) {
    
        //delete the element we clicked
        if (x.target.className === 'fas fa-times') {
            if(confirm('Are you sure ?')){
            x.target.parentElement.parentElement.remove();

            //local stroge delete item
            
            let control = x.target.parentElement.parentElement.childNodes[0].textContent;
            
            taskList = getLs();
            
            for (let index = 0; index < taskList.length; index++) {
                
                if (control === taskList[index]) {
                    taskList.splice(index,1);
                    localStorage.setItem('taskList',JSON.stringify(taskList));
                }
                
            }
        }
        else{}
        }
    
}

function addNewItem(x)
{
    x.preventDefault(); // page refreshing stop

    if (input.value == '') {
        console.error('Error cannot be empty');
        
    }
    else{
        
        
        // localStorage.setItem('taskList',JSON.stringify(taskList));

        //create li
        let li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';

        //li add write todo
        li.innerText = input.value;

        

        //create a
        let a = document.createElement('a');
        a.className = 'delete-item float-right';
        a.setAttribute('href','#');
        a.innerHTML = "<i class='fas fa-times'></i>"

        //li add to a
        li.appendChild(a);

        //ul add to li
        ul.appendChild(li);
        
        setLs(input.value);

        input.value = '';



        }
}

function getLs() {

    if (localStorage.getItem('taskList') === null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem('taskList'));
    }
    return taskList;
    
}

function setLs(x) { 
    taskList = getLs();
    taskList.push(x);
    localStorage.setItem('taskList',JSON.stringify(taskList));
    
}

function taskListFunc() {
    taskList = getLs();
    for (let index = 0; index < taskList.length; index++) {
        let li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';

        //li add write todo
        li.innerText = taskList[index];

        //create a
        let a = document.createElement('a');
        a.className = 'delete-item float-right';
        a.setAttribute('href','#');
        a.innerHTML = "<i class='fas fa-times'></i>"

        //li add to a
        li.appendChild(a);

        //ul add to li
        ul.appendChild(li);
    
        
    }
}
