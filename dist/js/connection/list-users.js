var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function GetUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://127.0.0.1:8080/api/v1/users');
            const data = yield response.json();
            listUsers(data);
        }
        catch (error) {
            console.log("Erro!");
        }
    });
}
function listUsers(tasks) {
    let output = '';
    let cont = 0;
    for (let task of tasks) {
        cont = cont + 1;
        output += `
            <div class="div-tasks">
                <div>

                </div>
                <p class="cont" id="${cont}"></p>
                <h2>Name: ${task.name}</h2>
                <h2>CPF: ${task.cpf}</h2>
                <h2>Birth Date: ${task.birthDate}</h2>
                <h2>Email: ${task.email}</h2>
                <h2>Address: ${task.address}</h2>
                <h2>Number: ${task.number}</h2>
                <h2>Complement: ${task.complement}</h2>
                <h2>City: ${task.city}</h2>
                <h2>State: ${task.state}</h2>
                <h2>Country: ${task.country}</h2>
                <h2>Zip code: ${task.zipCode}</h2>
                <div class="border"></div>
            </div>
        `;
    }
    document.querySelector('.main-list-tasks').innerHTML = output;
    var aux = document.querySelector('.cont');
    console.log(aux.id);
    console.log(cont);
}
GetUsers();