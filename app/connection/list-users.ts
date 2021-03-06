async function GetUsers() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/users')
        const data = await response.json()
        listUsers(data)        
    } catch(error) {
        // console.log("Erro!")
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
                <h2 class="name-user" id="${task.user}">Name: ${task.name}</h2>
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
                <div class="imgs">
                    <div class="img1" onclick="loadUpdate('${task._id}');"><img src="./img/editar.png" width=25 height=25></div>
                    <div class="img2" onclick="deleteUser('${task._id}')"><img src="./img/cesto-de-lixo.png" width=30 height=30></div>
                </div>
            </div>
        `
    }
    document.querySelector('.main-list-tasks').innerHTML = output;
    var aux = (<HTMLSelectElement>document.querySelector('.cont'));

    Start2()
}

function SearchNameUsers() {
    let input = (<HTMLSelectElement>document.getElementById('searchbar')).value;
    input.toLocaleLowerCase();
    if (input) {
        let divs = (<HTMLSelectElement><unknown>document.querySelectorAll('.div-tasks'));
        let users = (<HTMLSelectElement><unknown>document.querySelectorAll('.name-user'));
        for (let i = 0; users.length > i; i++) {
            if (!users[i].innerHTML.toLocaleLowerCase().includes(input)) {
                divs[i].style.display="none"
            }else {
                divs[i].style.display="list-item"
            }
        }
    }else {
        Start2()
    }
    
}

let init2 = 0;
let finish2 = 4;
function Start2() {
    let divs = (<HTMLSelectElement><unknown>document.querySelectorAll('.div-tasks'));  
    for(let i = 0;  divs.length > i; i++) {

        if(i >= init2 && i < finish2) {
            divs[i].style.display="list-item"

        } else{
            divs[i].style.display="none"
        }
    }
}



function next2() {
    let divs = (<HTMLSelectElement><unknown>document.querySelectorAll('.div-tasks'));
    if(finish2 <= divs.length){
        init2 += 4;
        finish2 += 4;
        
        if (init2 <= divs.length)  {
            for(let i = 0;  divs.length > i; i++) {
    
                if(i >= init2 && i < finish2) {
                    divs[i].style.display="list-item"
        
                } else{
                    divs[i].style.display="none"
                }
            }
        }else if (finish2 > divs.length) {
            return
        }
    }
    
}

function back2() {
    let divs = (<HTMLSelectElement><unknown>document.querySelectorAll('.div-tasks'));
    if((init2 - 1) >= 0){
        init2 -= 4;
        finish2 -= 4;
        
        if (init2 <= divs.length)  {
            for(let i = 0;  divs.length > i; i++) {
    
                if(i >= init2 && i < finish2) {
                    divs[i].style.display="list-item"
        
                } else{
                    divs[i].style.display="none"
                }
            }
        }else if (finish2 > divs.length) {
            return
        }
    }
}