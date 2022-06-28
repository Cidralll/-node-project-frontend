async function GetUsers() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/users')
        const data = await response.json()
        listUsers(data)        
    } catch(error) {
        console.log("Erro!")
    }
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
        `
    }
    document.querySelector('.main-list-tasks').innerHTML = output;
    var aux = (<HTMLSelectElement>document.querySelector('.cont'));
    console.log(aux.id)
    console.log(cont)

}
GetUsers();
