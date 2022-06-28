// esta colocando os nomes de usuarios dentro do select
async function GetNameSelection() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/users')
        const data = await response.json()

        listSelection(data)        
    } catch(error) {
        console.log("Erro!")
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
