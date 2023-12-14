
const myKey='todos'

const getFromLocalStorage=()=> {
    
    const storedJsonString = localStorage.getItem(myKey);

    return storedJsonString ? JSON.parse(storedJsonString) : [];
}
  
  
const setToLocalStorage=(data)=> {

    const jsonString = JSON.stringify(data);

    localStorage.setItem(myKey, jsonString);
}

export { setToLocalStorage,getFromLocalStorage }
  