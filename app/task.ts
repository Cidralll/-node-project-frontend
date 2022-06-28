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

// vai salvar os dados no banco
async function Submit() {
    let description = (<HTMLSelectElement>document.getElementById('description')).value;
    let date = (<HTMLSelectElement>document.getElementById('date')).value;
    let time = (<HTMLSelectElement>document.getElementById('time')).value;
    let user = (<HTMLSelectElement>document.getElementById('user')).value;   

    console.log(description)
    console.log(date)
    console.log(time)
    console.log(user)

    let text = CreatingJSON(description, date, time, user)
    
    console.log(text)

    //await CreateTask(text)
}

function CreatingJSON(description, date, time, user) { 
    let json = {
        "description": description,
        "date": `${date} ${time}`,
        "user": user
    }
    
    return json;
}

/*async function CreateTask(text) {
    let request = await fetch('http://127.0.0.1/:8080/api/v1/task', {
        method: 'POST',
        body: text,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
   
   return request;
}*/