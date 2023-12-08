

let tasks=["abcd","def"]

let myContent=document.querySelector(".content")


function refreshData(){
    myContent.innerHTML=''
    let str=''
    tasks.forEach((x,i)=>
        str+=`<div class="card-task"> 
        <p>${x}</p>
        <button onclick="deleteTask(${i})">DEL</button>
        </div>`
    )
    myContent.innerHTML=str
}

document.querySelector("form").addEventListener('submit',
    e=>{
    e.preventDefault()
    tasks.push(document.querySelector('textarea').value);
    document.querySelector("form").reset()
   refreshData()
})

function deleteTask(index){
    tasks.splice(index, 1);
    refreshData();
}
refreshData()


// but.addEventListener('click', function (event)
//  { event.target.parentElement.parentElement.removeChild(event.target.parentElement); });