

let tasks=['Task : study javascript 2']

let myContent=document.querySelector(".content")


function refreshData(){

    myContent.innerHTML=''
    tasks.forEach((x,i)=>{
        let cardDiv=document.createElement('div')
        cardDiv.classList.add('card-task')

        let cardText=document.createElement('p')
        cardText.textContent=x

        let cardRemoveBtn=document.createElement('button')
        cardRemoveBtn.textContent='Del'
        cardRemoveBtn.onclick=()=>deleteTask(i)

        cardDiv.appendChild(cardText)
        cardDiv.appendChild(cardRemoveBtn)
        myContent.appendChild(cardDiv)
    } )
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