var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getForm() {
    let nameUser = document.querySelector("#name").value;
    let cpf = document.querySelector("#cpf").value;
    let birthDate = document.querySelector("#birthDate").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let address = document.querySelector("#address").value;
    let number = document.querySelector("#number").value;
    let complement = document.querySelector("#complement").value;
    let city = document.querySelector("#city").value;
    let state = document.querySelector("#state").value;
    let country = document.querySelector("#country").value;
    let zipCode = document.querySelector("#zipCode").value;
    let form = {
        "name": nameUser,
        "cpf": cpf,
        "birthDate": birthDate,
        "email": email,
        "password": password,
        "address": address,
        "number": number,
        "complement": complement,
        "city": city,
        "state": state,
        "country": country,
        "zipCode": zipCode
    };
    return form;
}
const getOneUser = (id) => __awaiter(this, void 0, void 0, function* () {
    const response = yield getOneRequest(id);
    console.log(response);
    const json = yield response['json']();
    console.log(json);
    let statusCode = response['status'];
    if (statusCode == 400) {
        console.log(json['message']);
    }
    else if (statusCode == 500) {
        console.log(json['message']);
    }
    else if (statusCode == 200) {
        console.log("OK!");
    }
    document.querySelector("#name").value = json.name;
    document.querySelector("#cpf").value = json.cpf;
    document.querySelector("#birthDate").value = json.birthDate;
    document.querySelector("#email").value = json.email;
    document.querySelector("#password").value = json.password;
    document.querySelector("#address").value = json.address;
    document.querySelector("#number").value = json.number;
    document.querySelector("#complement").value = json.complement;
    document.querySelector("#city").value = json.city;
    document.querySelector("#state").value = json.state;
    document.querySelector("#country").value = json.country;
    document.querySelector("#zipCode").value = json.zipCode;
});
function getOneRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`http://127.0.0.1:8080/api/v1/users/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return (res);
    });
}
const createUser = () => __awaiter(this, void 0, void 0, function* () {
    let response = yield createRequest();
    let json = yield response['json']();
    let statusCode = response['status'];
    if (statusCode == 400) {
        console.log(json['message']);
    }
    else if (statusCode == 500) {
        console.log(json['message']);
    }
    else if (statusCode == 201) {
        console.log("OK!");
    }
});
function createRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        let form = getForm();
        let request = yield fetch("http://127.0.0.1:8080/api/v1/users", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return request;
    });
}
const deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
    let response = yield deleteRequest(id);
    let json = yield response['json']();
    let statusCode = response['status'];
    if (statusCode == 400) {
        console.log(json['message']);
    }
    else if (statusCode == 500) {
        console.log(json['message']);
    }
    else if (statusCode == 200) {
        console.log("OK!");
    }
});
function deleteRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let request = yield fetch(`http://127.0.0.1:8080/api/v1/users/${id}`, {
            method: 'DELETE'
        });
        return request;
    });
}
const loadUpdate = (id) => {
    window.location.href = `http://localhost:3000/edit_user.html?param=${id}`;
};
const loadUser = () => {
    const params = new URLSearchParams(window.location.search);
    for (const param of params) {
        var id = param[1];
    }
    getOneUser(id);
};
const updateUser = () => __awaiter(this, void 0, void 0, function* () {
    const params = new URLSearchParams(window.location.search);
    for (const param of params) {
        var id = param[1];
    }
    let response = yield updateRequest(id);
    let json = yield response['json']();
    let statusCode = response['status'];
    if (statusCode == 400) {
        console.log(json['message']);
    }
    else if (statusCode == 500) {
        console.log(json['message']);
    }
    else if (statusCode == 200) {
        window.location.href = `http://localhost:3000/list-users.html`;
        console.log("OK!");
    }
});
function updateRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let form = getForm();
        let request = yield fetch(`http://127.0.0.1:8080/api/v1/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return request;
    });
}
