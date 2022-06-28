var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// esta colocando os nomes de usuarios dentro do select
function GetNameSelection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://127.0.0.1:8080/api/v1/users');
            const data = yield response.json();
            listSelection(data);
        }
        catch (error) {
            console.log("Erro!");
        }
    });
}
function listSelection(names) {
    let output = '';
    for (let name of names) {
        output += `
            <option value="${name.name}" class="option-value">${name.name}</option>
        `;
    }
    document.querySelector('.select').innerHTML = output;
}
GetNameSelection();
// salva no banco
function getTask() {
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let user = document.getElementById('user').value;
    let form = {
        "description": description,
        "date": `${date} ${time}`,
        "user": user
    };
    return form;
}
const createTask = () => __awaiter(this, void 0, void 0, function* () {
    let response = yield createRequestTask();
    let json = yield response['json']();
    let statusCode = response['status'];
    if (statusCode == 400) {
        console.log(json['message']);
    }
    else if (statusCode == 500) {
        console.log(json['message']);
    }
    else if (statusCode == 201) {
        console.log("OK!");
    }
});
function createRequestTask() {
    return __awaiter(this, void 0, void 0, function* () {
        let form = getTask();
        console.log(JSON.stringify(form));
        let request = yield fetch("http://127.0.0.1:8080/api/v1/tasks", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return request;
    });
}
