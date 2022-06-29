// esta colocando os nomes de usuarios dentro do select
async function GetNameSelection() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/users')
        const data = await response.json()

        listSelection(data)        
    } catch(error) {
        // console.log("Erro!")
    }
}
function listSelection(names) {
    let output = '';

    for (let name of names) {
        output += `
            <option value="${name.name}" class="option-value">${name.name}</option>
        `
    }
    document.querySelector('.select').innerHTML = output;
}
GetNameSelection();

// salva no banco
function getTask(): Object{
    let description = (<HTMLSelectElement>document.getElementById('description')).value;
    let date = (<HTMLSelectElement>document.getElementById('date')).value;
    let time = (<HTMLSelectElement>document.getElementById('time')).value;
    let user = (<HTMLSelectElement>document.getElementById('user')).value;

    let form = {
        "description": description,
        "date": `${date} ${time}`,
        "user": user
    }
        
    return form;
}

const createTask = async () => {
    let validating = validatingTasks();
    if (validating) {
        let response = await createRequestTask();
        let json = await response['json']();
        let statusCode = response['status'];
        if(statusCode == 400){
            console.log(json['message'])
        }else if(statusCode == 500) {
            console.log(json['message'])
        }else if(statusCode == 201){
            console.log("OK!")
            document.location.reload();
            return alert('Created task')
        }
    }else {
        return;
    }
}


async function createRequestTask(): Promise<Object>{
    let form = getTask();
    console.log(JSON.stringify(form));
    let request = await fetch("http://127.0.0.1:8080/api/v1/tasks", {
        method: 'POST',
        body: JSON.stringify(form),
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    });
    return request;
}

const loadTaskUpdate = (id) => {
    window.location.href = `http://localhost:3000/edit_list.html?param=${id}`;
}

const loadTask = () => {
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
        var id = param[1]
    }
    getOneTask(id);
}

const getOneTask = async (id) => {
    const response = await getOneTaskRequest(id);
    const json = await response['json']();
    let statusCode = response['status'];
    if(statusCode == 400){
        console.log(json['message'])
    }else if(statusCode == 500) {
        console.log(json['message'])
    }else if(statusCode == 200){
        console.log("OK!")
    }
    
    let inputDateTime = json.date;
    let date = inputDateTime.slice(0,10);
    let time = inputDateTime.slice(11,19);

    (<HTMLSelectElement> document.querySelector("#description")).value = json.description;
    (<HTMLSelectElement> document.querySelector("#date")).value = date;
    (<HTMLSelectElement> document.querySelector("#time")).value = time;
    (<HTMLSelectElement> document.querySelector("#user")).value = json.user;
}


async function getOneTaskRequest(id): Promise<Object>{
    let res = await fetch(`http://127.0.0.1:8080/api/v1/tasks/${id}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    })
    return (res);
}

const updateTask = async () => {
    let validating = validatingTasks()
    if (validating) {
        const params = new URLSearchParams(window.location.search)
        for (const param of params) {
            var id = param[1]
        }
        let response = await updateTaskRequest(id);
        let json = await response['json']();
        let statusCode = response['status'];
        if(statusCode == 400){
            console.log(json['message'])
        }else if(statusCode == 500) {
            console.log(json['message'])
        }else if(statusCode == 200){
            window.location.href = `http://localhost:3000/list-tasks.html`;
            console.log("OK!")
        }
    }else {
        return
    }
}


async function updateTaskRequest(id): Promise<Object>{
    let form = getTask();
    let request = await fetch(`http://127.0.0.1:8080/api/v1/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    });
    return request;
}

// VALIDANDO DADOS  PARA ENVIAR
function validatingTasks() {
    let msgHHTML = '';
    let description = (<HTMLSelectElement>document.getElementById('description')).value;
    let date = (<HTMLSelectElement>document.getElementById('date')).value;
    let time = (<HTMLSelectElement>document.getElementById('time')).value;
    let validating = true;

    //VALIDADNDO DESCRICAO
    if (description.length < 1) {
        msgHHTML = `<p class="error-input">Description cannot be null</p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg1')).innerHTML = msgHHTML;
        validating = false;
    }else if (description.length > 0) {
        msgHHTML = `<p class="error-input"></p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg1')).innerHTML = msgHHTML;
    }

    // validando data futura
    if (date.length < 10) { 
        msgHHTML = `<p class="error-input">Enter a valid date</p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg2')).innerHTML = msgHHTML;
        validating = false;
    } else if (date.length == 10) {
        msgHHTML = `<p class="error-input"></p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg2')).innerHTML = msgHHTML;
    }
    if (date.length == 10) {
        let [dayInput, monthInput, yearInput] = date.split('/').map(Number)
        
        let dateNow = new Date();
        let dayNow2 = String(dateNow.getDate()).padStart(2, '0');
        let dayNow = parseInt(dayNow2)
        let monthNow2 = String(dateNow.getMonth()).padStart(2, '0');
        let monthNow  = parseInt(monthNow2);
        monthNow++;
        let yearNow2 = String(dateNow.getFullYear()).padStart(2, '0');
        let yearNow  = parseInt(yearNow2);

        if (yearNow <= yearInput && yearInput < 2023) {
            console.log('tudo certo ate o ano')
            if(monthNow <= monthInput && monthInput < 13) {
                console.log('tudo certo ate o mes')
                if (monthNow == monthInput) {
                    if (dayNow < dayInput && dayInput < 32) {
                        console.log('Tudo certo')
                    } else {
                        msgHHTML = `<p class="error-input">Enter a valid value for the day</p>`;
                        (<HTMLSelectElement>document.querySelector('.input-error-msg2')).innerHTML = msgHHTML;
                        validating = false
                    }
                }
            }else {
                msgHHTML = `<p class="error-input">Enter a valid value for the month</p>`;
                (<HTMLSelectElement>document.querySelector('.input-error-msg2')).innerHTML = msgHHTML;
                validating = false;
            }
        }else {
            msgHHTML = `<p class="error-input">Enter a valid value for the year</p>`;
            (<HTMLSelectElement>document.querySelector('.input-error-msg2')).innerHTML = msgHHTML;
            validating = false
        }
    }

    //VALIDANDO TIME
    if (time.length < 5) {
        msgHHTML = `<p class="error-input">Inform a valid time</p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg3')).innerHTML = msgHHTML;
        validating = false;
    }else if (time.length == 5) {
        let ok = true;
        let [a, b, c, d, e] = time.padStart(4, '');
        let hour = parseInt(a + b);
        let minutes = parseInt(d + e);
        if (hour >24 || minutes > 60) {
            msgHHTML = `<p class="error-input"></p>`;
            (<HTMLSelectElement>document.querySelector('.input-error-msg3')).innerHTML = msgHHTML;
        }else if (ok == true){
            msgHHTML = `<p class="error-input"></p>`;
            (<HTMLSelectElement>document.querySelector('.input-error-msg3')).innerHTML = msgHHTML;
        }

        console.log(`${hour}:${minutes}`)
    }

    
    return validating;
}