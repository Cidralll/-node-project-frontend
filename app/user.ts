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
    console.log(JSON.stringify(form));
    let request = await fetch("http://127.0.0.1:3000/api/v1/users", {
        method: 'POST',
        body: JSON.stringify(form),
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    });
    return request;
}
