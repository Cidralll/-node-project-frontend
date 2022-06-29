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
            // console.log("Erro!")
        }
    });
}
function listSelection(names) {
    let output = '';
    let select = `<option value="1" class="option-value">Select</option>`;
    output += select;
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
    let validating = validatingTasks();
    if (validating) {
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
            document.location.reload();
            return alert('Created task');
        }
    }
    else {
        return;
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
const loadTaskUpdate = (id) => {
    window.location.href = `http://localhost:3000/edit_list.html?param=${id}`;
};
const loadTask = () => {
    const params = new URLSearchParams(window.location.search);
    for (const param of params) {
        var id = param[1];
    }
    getOneTask(id);
};
const getOneTask = (id) => __awaiter(this, void 0, void 0, function* () {
    const response = yield getOneTaskRequest(id);
    const json = yield response['json']();
    let statusCode = response['status'];
    if (statusCode == 400) {
        console.log(json['message']);
    }
    else if (statusCode == 500) {
        console.log(json['message']);
    }
    else if (statusCode == 200) {
    }
    let inputDateTime = json.date;
    let date = inputDateTime.slice(0, 10);
    let time = inputDateTime.slice(11, 19);
    document.querySelector("#description").value = json.description;
    document.querySelector("#date").value = date;
    document.querySelector("#time").value = time;
    document.querySelector("#user").value = json.user;
});
function getOneTaskRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`http://127.0.0.1:8080/api/v1/tasks/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return (res);
    });
}
const updateTask = () => __awaiter(this, void 0, void 0, function* () {
    let validating = validatingTasks();
    if (validating) {
        const params = new URLSearchParams(window.location.search);
        for (const param of params) {
            var id = param[1];
        }
        let response = yield updateTaskRequest(id);
        let json = yield response['json']();
        let statusCode = response['status'];
        if (statusCode == 400) {
            console.log(json['message']);
        }
        else if (statusCode == 500) {
            console.log(json['message']);
        }
        else if (statusCode == 200) {
            window.location.href = `http://localhost:3000/list-tasks.html`;
        }
    }
    else {
        return;
    }
});
function updateTaskRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let form = getTask();
        let request = yield fetch(`http://127.0.0.1:8080/api/v1/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return request;
    });
}
// VALIDANDO DADOS  PARA ENVIAR
function validatingTasks() {
    let msgHHTML = '';
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let user = document.getElementById('user').value;
    let validating = true;
    //VALIDADNDO DESCRICAO
    if (description.length < 1) {
        msgHHTML = `<p class="error-input">Description cannot be null</p>`;
        document.querySelector('.input-error-msg1').innerHTML = msgHHTML;
        validating = false;
    }
    else if (description.length > 0) {
        msgHHTML = `<p class="error-input"></p>`;
        document.querySelector('.input-error-msg1').innerHTML = msgHHTML;
    }
    // validando data futura
    if (date.length < 10) {
        msgHHTML = `<p class="error-input">Enter a valid date</p>`;
        document.querySelector('.input-error-msg2').innerHTML = msgHHTML;
        validating = false;
    }
    else if (date.length == 10) {
        msgHHTML = `<p class="error-input"></p>`;
        document.querySelector('.input-error-msg2').innerHTML = msgHHTML;
    }
    if (date.length == 10) {
        let [dayInput, monthInput, yearInput] = date.split('/').map(Number);
        let dateNow = new Date();
        let dayNow2 = String(dateNow.getDate()).padStart(2, '0');
        let dayNow = parseInt(dayNow2);
        let monthNow2 = String(dateNow.getMonth()).padStart(2, '0');
        let monthNow = parseInt(monthNow2);
        monthNow++;
        let yearNow2 = String(dateNow.getFullYear()).padStart(2, '0');
        let yearNow = parseInt(yearNow2);
        if (yearNow <= yearInput && yearInput < 2023) {
            if (monthNow <= monthInput && monthInput < 13) {
                if (monthNow == monthInput) {
                    if (dayNow < dayInput && dayInput < 32) {
                        console.log('Tudo certo');
                    }
                    else {
                        msgHHTML = `<p class="error-input">Enter a valid value for the day</p>`;
                        document.querySelector('.input-error-msg2').innerHTML = msgHHTML;
                        validating = false;
                    }
                }
            }
            else {
                msgHHTML = `<p class="error-input">Enter a valid value for the month</p>`;
                document.querySelector('.input-error-msg2').innerHTML = msgHHTML;
                validating = false;
            }
        }
        else {
            msgHHTML = `<p class="error-input">Enter a valid value for the year</p>`;
            document.querySelector('.input-error-msg2').innerHTML = msgHHTML;
            validating = false;
        }
    }
    //VALIDANDO TIME
    if (time.length < 5) {
        msgHHTML = `<p class="error-input">Inform a valid time</p>`;
        document.querySelector('.input-error-msg3').innerHTML = msgHHTML;
        validating = false;
    }
    else if (time.length == 5) {
        let ok = true;
        let [a, b, c, d, e] = time.padStart(4, '');
        let hour = parseInt(a + b);
        let minutes = parseInt(d + e);
        if (hour > 24 || minutes > 60) {
            msgHHTML = `<p class="error-input"></p>`;
            document.querySelector('.input-error-msg3').innerHTML = msgHHTML;
        }
        else if (ok == true) {
            msgHHTML = `<p class="error-input"></p>`;
            document.querySelector('.input-error-msg3').innerHTML = msgHHTML;
        }
        console.log(`${hour}:${minutes}`);
    }
    // VALIDANDO SELECT
    if (user == '1') {
        msgHHTML = `<p class="error-input">Select a user</p>`;
        document.querySelector('.input-error-msg4').innerHTML = msgHHTML;
        validating = false;
    }
    else if (user != '1') {
        msgHHTML = `<p class="error-input"></p>`;
        document.querySelector('.input-error-msg4').innerHTML = msgHHTML;
    }
    return validating;
}
