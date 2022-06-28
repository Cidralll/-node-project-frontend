function getForm(): Object{
    let nameUser = (<HTMLSelectElement> document.querySelector("#name")).value;
    let cpf = (<HTMLSelectElement> document.querySelector("#cpf")).value;
    let birthDate = (<HTMLSelectElement> document.querySelector("#birthDate")).value;
    let email = (<HTMLSelectElement> document.querySelector("#email")).value;
    let password = (<HTMLSelectElement> document.querySelector("#password")).value;
    let address = (<HTMLSelectElement> document.querySelector("#address")).value;
    let number = (<HTMLSelectElement> document.querySelector("#number")).value;
    let complement = (<HTMLSelectElement> document.querySelector("#complement")).value;
    let city = (<HTMLSelectElement> document.querySelector("#city")).value;
    let state = (<HTMLSelectElement> document.querySelector("#state")).value;
    let country = (<HTMLSelectElement> document.querySelector("#country")).value;
    let zipCode = (<HTMLSelectElement> document.querySelector("#zipCode")).value;

    let form = {
        "name" : nameUser,
        "cpf" : cpf,
        "birthDate" : birthDate,
        "email" : email,
        "password" : password,
        "address" : address,
        "number" : number,
        "complement" : complement,
        "city" : city,
        "state" : state,
        "country" : country,
        "zipCode" : zipCode
    }
        
    return form;
}

const getOneUser = async (id) => {
    const response = await getOneRequest(id);
    console.log(response);
    const json = await response['json']();
    console.log(json);
    let statusCode = response['status'];
    if(statusCode == 400){
        console.log(json['message'])
    }else if(statusCode == 500) {
        console.log(json['message'])
    }else if(statusCode == 200){
        console.log("OK!")
    }
    
    (<HTMLSelectElement> document.querySelector("#name")).value = json.name;
    (<HTMLSelectElement> document.querySelector("#cpf")).value = json.cpf;
    (<HTMLSelectElement> document.querySelector("#birthDate")).value = json.birthDate;
    (<HTMLSelectElement> document.querySelector("#email")).value = json.email;
    (<HTMLSelectElement> document.querySelector("#password")).value = json.password;
    (<HTMLSelectElement> document.querySelector("#address")).value = json.address;
    (<HTMLSelectElement> document.querySelector("#number")).value = json.number;
    (<HTMLSelectElement> document.querySelector("#complement")).value = json.complement;
    (<HTMLSelectElement> document.querySelector("#city")).value = json.city;
    (<HTMLSelectElement> document.querySelector("#state")).value = json.state;
    (<HTMLSelectElement> document.querySelector("#country")).value = json.country;
    (<HTMLSelectElement> document.querySelector("#zipCode")).value = json.zipCode;
}


async function getOneRequest(id): Promise<Object>{
    let res = await fetch(`http://127.0.0.1:8080/api/v1/users/${id}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    })
    return (res);
}

const createUser = async () => {
    let response = await createRequest();
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


async function createRequest(): Promise<Object>{
    let form = getForm();
    let request = await fetch("http://127.0.0.1:8080/api/v1/users", {
        method: 'POST',
        body: JSON.stringify(form),
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    });
    return request;
}

const deleteUser = async (id) => {
    let verifica = confirm("Tem certeza que quer excluir este usuario?")
    if (verifica) {
        let response = await deleteRequest(id);
        let json = await response['json']();
        let statusCode = response['status'];
        if(statusCode == 400){
            console.log(json['message'])
        }else if(statusCode == 500) {
            console.log(json['message'])
        }else if(statusCode == 200){
            console.log("OK!")
        }
    }
}

async function deleteRequest(id): Promise<Object>{
    let request = await fetch(`http://127.0.0.1:8080/api/v1/users/${id}`, {
        method: 'DELETE'
    });
    return request;
}

const loadUpdate = (id) => {
    window.location.href = `http://localhost:3000/edit_user.html?param=${id}`;
}

const loadUser = () => {
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
        var id = param[1]
    }
    getOneUser(id);
}

const updateUser = async () => {
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
        var id = param[1]
    }
    let response = await updateUserRequest(id);
    let json = await response['json']();
    let statusCode = response['status'];
    if(statusCode == 400){
        console.log(json['message'])
    }else if(statusCode == 500) {
        console.log(json['message'])
    }else if(statusCode == 200){
        window.location.href = `http://localhost:3000/list-users.html`;
        console.log("OK!")
    }
}


async function updateUserRequest(id): Promise<Object>{
    let form = getForm();
    let request = await fetch(`http://127.0.0.1:8080/api/v1/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    });
    return request;
}