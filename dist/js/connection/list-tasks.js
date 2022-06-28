var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function GetTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://127.0.0.1:8080/api/v1/tasks');
            const tasks = yield response.json();
            listTask(tasks);
        }
        catch (error) {
            console.log("Erro!");
        }
    });
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
                <h2 class="name-user" id="${task.user}">Userame: ${task.user}</h2>
                <div class="imgs">
                    <div class="img1" onclick="editTask(${task._id})"><img src="./img/editar.png" width=25 height=25></div>
                    <div class="img2" onclick="DeleteTask(${cont})"><img src="./img/cesto-de-lixo.png" width=30 height=30></div>
                </div>
            </div>
        `;
    }
    document.querySelector('.main-list-tasks').innerHTML = output;
    var aux = document.querySelector('.div-tasks');
}
GetTasks();
const state = {
    page: 1,
    perPage: 5
};
function SearchName() {
    let input = document.getElementById('searchbar').value;
    input.toLocaleLowerCase();
    let divs = document.querySelectorAll('.div-tasks');
    let users = document.querySelectorAll('.name-user');
    for (let i = 0; users.length > i; i++) {
        if (!users[i].innerHTML.toLocaleLowerCase().includes(input)) {
            divs[i].style.display = "none";
        }
        else {
            divs[i].style.display = "list-item";
        }
    }
}
