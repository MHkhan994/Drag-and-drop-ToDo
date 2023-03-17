const addTaskEl = document.getElementById('add-task')
const inputfieldEl = document.getElementById('input-field')

const todoEl = document.querySelector('.todo')
const workonEl = document.querySelector('.work-on')
const completeEl = document.querySelector('.complete')

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let dragItem = null;

const addTask = () =>{
    todoEl.innerHTML = '';
    workonEl.innerHTML = '';
    completeEl.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        const div = document.createElement('div')
        div.classList.add('draggable', 'bg-slate-100', 'text-xl', 'p-2', 'rounded-sm', 'flex', 'justify-between','my-2');
        div.setAttribute('draggable','true')
        div.innerHTML = `
        ${tasks[i].text}
        <button onclick="remove(this)"><i class="fa-solid fa-trash"></i></button>
    `

        if(tasks[i].status === 'todo'){
            todoEl.appendChild(div)
        }
        else if(tasks[i].status === 'workon'){
            workonEl.appendChild(div)
        }
        else if(tasks[i].status === 'complete'){
            completeEl.appendChild(div)
        }

        div.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragging')
            dragItem = e.target
        })

        div.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging')
        })
    }

}


// handels drag

const containers = document.querySelectorAll('.container')
containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    container.addEventListener('drop', (e) => {
        console.log(e.target)
        console.log(dragItem)
        const dragTask = tasks.find(task => task.text === dragItem.innerText)
        const index = tasks.indexOf(dragTask)
        
        if(e.target.classList.contains('todo')){    
            tasks[index].status = 'todo'
        }
        else if(e.target.classList.contains('work-on')){
            tasks[index].status = 'workon'
        }
        else if(e.target.classList.contains('complete')){
            tasks[index].status = 'complete'
        }

        localStorage.setItem('tasks', JSON.stringify(tasks))       
        addTask()
    })
})

addTaskEl.addEventListener('click', () => {
    const task = inputfieldEl.value.trim();
    console.log(task)
    tasks.push({status:'todo', text: task})
    localStorage.setItem('tasks', JSON.stringify(tasks))
    inputfieldEl.value = ''
    addTask()
})

addTask()

