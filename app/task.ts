function Submit() {
    let description = (<HTMLSelectElement>document.getElementById('description')).value;
    let date = (<HTMLSelectElement>document.getElementById('date')).value;
    let time = (<HTMLSelectElement>document.getElementById('time')).value;
    let user = (<HTMLSelectElement>document.getElementById('user')).value;   

}

GetData();

async function GetData() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/users')
        const data = await response.json()

        
        list(data)
       

        
    } catch(error) {
        console.log("Erro!")
    }
    
    
}

function list(users) {
    let output = '';

    for (let user of users) {
        output += `
            <option value="${user.id}">${user.user}</option>
        `
    }
    document.querySelector('.select').innerHTML = output;
}