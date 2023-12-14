
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { getFromLocalStorage,setToLocalStorage } from './helper.js';


// ---------- render / update screen ----------
const render=(qry)=>{
    let constCard=document.querySelector('#card-add-task')
    let WrapperCards=document.querySelector('#list-tasks')
    WrapperCards.innerHTML=''

    let data=getFromLocalStorage()

    if (qry !== undefined && qry !== '') {
        data = data.filter(x => x.title.includes(qry) || x.desc.includes(qry));
    }
    document.querySelector('#no-of-tasks').innerHTML= `Total found : ${data.length}`
    data.forEach(taskObj=>{

        let cardDiv=document.createElement('div')
        cardDiv.className='card-task'

        let title=document.createElement('h4')
        title.style.margin='0'
        title.textContent=taskObj.title

        let desc=document.createElement('p')
        desc.textContent=taskObj.desc

        let dt = document.createElement('span');
        dt.innerHTML = `<b>Due</b> :${taskObj.dateOfTask} ${taskObj.timeOfTask} `;

        let btnDel=document.createElement('button')
        btnDel.className='del-task'
        btnDel.onclick=()=>deleteTask(taskObj.id)
        btnDel.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
<path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 7H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        `

        cardDiv.append(title,desc,dt,btnDel)
        WrapperCards.append(cardDiv)
        }
    )
    WrapperCards.append(constCard)
}
render()

// ---------- Add new Task ----------
document.querySelector('#card-add-task form').addEventListener('submit',e=>{
    e.preventDefault()

    let data=getFromLocalStorage()
    data.push(
        {
            id:uuidv4(),
            title:document.querySelector('#new-task-title').value.trim(),
            desc:document.querySelector('#new-task-desc').value.trim(),
            dateOfTask : document.querySelector('#new-task-date').value,
            timeOfTask : document.querySelector('#new-task-time').value
        })
        
    setToLocalStorage(data)
    e.target.reset();
    toogleTaskForm()
    render()
}) 

// ---------- delete Task ----------

const deleteTask=(id)=>{
    let data = getFromLocalStorage()
    setToLocalStorage(data.filter(x=>x.id!==id))
    render()
}

// ---------- Show / hide new card form ----------

let btnAddTask=document.querySelector('#btn-add')
let newTaskForm=document.querySelector('#card-add-task form')

let toogleTaskForm=()=>{

    if(btnAddTask.style.display!='none'){

        btnAddTask.style.display='none'
        newTaskForm.style.display='flex'

    }else{

        btnAddTask.style.display='block'
        newTaskForm.style.display='none'
    }

}



// ---------- Show / hide side bar ----------
document.querySelector("#btn-menu").addEventListener('click',()=>{

    let navContainer=Array.from(document.querySelectorAll("nav > div"))
    navContainer.push(navContainer.shift().firstElementChild)

    let nav=document.querySelector('nav')

    if(navContainer[0].classList.contains('hide-ele'))
        {
            navContainer.forEach(x=>x.classList.remove('hide-ele'))
            nav.style.width='20%';
        }
    else
        { 
            navContainer.forEach(x=>x.classList.add('hide-ele'))
            nav.style.width='auto';
        }
})

// ---------- Events ----------

btnAddTask.addEventListener('click',toogleTaskForm)

document.querySelector('#btn-cancel').addEventListener('click',toogleTaskForm)

document.querySelector('#input-search').addEventListener('input',(e)=>render(e.target.value.trim()))
// edit feature
// search bar