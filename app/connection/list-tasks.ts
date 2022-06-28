async function GetTasks() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/tasks')
        const tasks = await response.json()
        listTask(tasks)        
    } catch(error) {
        console.log("Erro!")
    }
}
function listTask(tasks) {
    let output = '';
    let cont = 0;
    for (let task of tasks) {
        cont = cont + 1;
        output += `
            <div class="div-tasks" id="${cont}">
                <div>

                </div>
                <h2 class="id" id="${task._id}">Id: ${cont}</h2>
                <h2>Description: ${task.description}</h2>
                <h2>Date task: ${task.date}</h2>
                <h2 class="name-user" id="${task.user}">Username: ${task.user}</h2>
                <div class="imgs">
                    <div class="img1" onclick="loadTaskUpdate('${task._id}');"><img src="./img/editar.png" width=25 height=25></div>
                    <div class="img2" onclick="DeleteTask(${cont})"><img src="./img/cesto-de-lixo.png" width=30 height=30></div>
                </div>
            </div>
        `
    }
    document.querySelector('.main-list-tasks').innerHTML = output;
    var aux = (<HTMLSelectElement>document.querySelector('.div-tasks'));

}
GetTasks();

const state = {
    page: 1,
    perPage: 5
}


function SearchName() {
    let input = (<HTMLSelectElement>document.getElementById('searchbar')).value;
    input.toLocaleLowerCase();
    let divs = (<HTMLSelectElement><unknown>document.querySelectorAll('.div-tasks'));
    let users = (<HTMLSelectElement><unknown>document.querySelectorAll('.name-user'));
    for (let i = 0; users.length > i; i++) {
        if (!users[i].innerHTML.toLocaleLowerCase().includes(input)) {
            divs[i].style.display="none"
        }else {
            divs[i].style.display="list-item"
        }
    }
}