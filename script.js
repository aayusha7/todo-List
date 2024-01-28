let list = []
let listFromStorage = localStorage.getItem("todolist");

if(listFromStorage){
    list =  JSON.parse(localStorage.getItem('todolist')) || [];
    for(let i =0;i<list.length;i++){
        let todoItem = list[i];
        addToTable(todoItem, i+1);
    }
}else{
    localStorage.setItem("todolist",JSON.stringify(list));
}


function clearToDo(){
    var table = document.getElementById("myTable");
    for(let i =1;i<list.length;i++){
        table.deleteRow(i);
    }
    list=[];
    localStorage.setItem("todolist",JSON.stringify([]));
    location.reload();

}

function markCheckBox(event){
    let checkBoxId = event.id;
    let id = checkBoxId.split('_')[1];
   

    list[id].isComplete = !list[id].isComplete;

    localStorage.setItem("todolist",JSON.stringify(list));
   
}



function submitForm(ev) {

    ev.preventDefault();
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value



    todo = {
        title: title,
        description: description,
        createdAt: new Date(),
        isComplete: false
    }



  

let result=true;

result=checkEmpty(title,description)
if(!result){
    return;
}
result=validateInput(title)
if(!result){
    return;
}
    list.push(todo);


    addToDiv();
    localStorage.setItem("todolist",JSON.stringify(list));
    showTabs("todoItems");

}
function addToDiv() {

    var todoItem = list[list.length-1];
    addToTable(todoItem, list.length)
  

}
function addToTable(item, i) {
    var table = document.getElementById("myTable");

    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = item.title;
    cell2.innerHTML = item.description;
    cell3.innerHTML = item.createdAt.toString().split('T')[0];
    
    let html = `<input type='checkbox' id='checkbox_${i-1}'  onclick='markCheckBox(this)'/>`
    if(item.isComplete){
        html = `<input type='checkbox' id='checkbox_${i-1}' checked  onclick='markCheckBox(this)'/>`
    }

    cell4.innerHTML += html;
}
function validateInput(title){
    
    for (var i = 0; i < list.length; i++) {
        if (list[i].title === title) {
            alert("Duplicate entry");
            return false;
        }
    }
    return true;

}
function checkEmpty(title,description){
    if (title.lengt===0 || description.length===0){
        alert("Title or Description can not be empty")
        return false;
    }
    return true;

}



function showTabs(tab){
    var ele = document.getElementById(tab);
    ele.classList.remove("hide");

    let hide = tab ==="add"?"todoItems":"add";

    let hideEle = document.getElementById(hide);
    hideEle.classList.add("hide")

}