async function GetTasks() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/tasks')
        const data = await response.json()
        console.log(data)
        listTask(data)        
    } catch(error) {
        console.log("Erro!")
    }
}
function listTask(names) {
    let output = '';

    for (let name of names) {
        output += `
            <div class="div-tasks">
                <div>

                </div>
                <h2>Description: ${name.description}</h2>
                <h2>Date task: ${name.date}</h2>
                <h2>Userame: ${name.user}</h2>
                <div class="border"></div>
            </div>
        `
    }
    document.querySelector('.main-list-tasks').innerHTML = output;
}
GetTasks();


