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
    let response = await createRequestTask();
    let json = await response['json']();
    let statusCode = response['status'];
    if(statusCode == 400){
        console.log(json['message'])
    }else if(statusCode == 500) {
        console.log(json['message'])
    }else if(statusCode == 201){
        console.log("OK!")
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