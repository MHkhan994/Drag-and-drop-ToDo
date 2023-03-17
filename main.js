const addTaskEl = document.getElementById('add-task')
const inputfieldEl = document.getElementById('input-field')

const todo = document.getElementById('todo')

let tasks = []
addTaskEl.addEventListener('click', () => {
    const task = inputfieldEl.value.trim();
    inputfieldEl.value = ''
    const previousTasks = JSON.parse(localStorage.getItem('tasks'))
    if(previousTasks){
        previousTasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(previousTasks))
    }
    else{
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    addEement(task)
    drag()
})


const getFromLocalStorage = () => {
    let tasks = []
    const previousTasks = JSON.parse(localStorage.getItem('tasks'))
    if(previousTasks){
        tasks.push(previousTasks)
    }
    return tasks
}

const displayFromLocal = () =>{
    const tasks = getFromLocalStorage()
    if(tasks[0]){
        tasks[0].forEach(task => {
            addEement(task)
        })
    }
}

const addEement = (task) => {
    let id = Math.round(Math.random()*10000)
    const div = document.createElement('div')
    div.classList.add('draggable', 'bg-slate-100', 'text-xl', 'p-2', 'rounded-sm', 'flex', 'justify-between','my-2');
    div.setAttribute('draggable','true')
    div.innerHTML = `
        <p id="${id}" class="font-semibold">${task}</p>
        <button onclick="remove(${id},this)"><i class="fa-solid fa-trash"></i></button>
    `
    todo.appendChild(div)
    console.log(id)
}

displayFromLocal()


const drag = () => {
const draggables = document.querySelectorAll('.draggable')
const containers=  document.querySelectorAll('.container')

draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart', (e) => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const dragging = document.querySelector('.dragging')
        container.appendChild(dragging)
    })
})


}

const remove = (id,e) => {
    const pretasks  = getFromLocalStorage()
    tasks = pretasks[0].map(task => console.log(task))
    console.log(tasks)
    const taskElement = document.getElementById(id)
    console.log(taskElement.innerText)
    if(tasks[0].includes(taskElement.innerText)){
        const index = tasks[0].indexOf(taskElement.innerText)
        console.log(index)
        tasks[0].splice(index, index+1)
        localStorage.setItem('tasks', JSON.stringify(tasks[0]))
    }
    e.parentNode.parentNode.removeChild(e.parentNode)
}

drag()
 
