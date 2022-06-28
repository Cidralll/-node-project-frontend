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
        console.log(JSON.stringify(form));
        let request = yield fetch("http://127.0.0.1:3000/api/v1/users", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return request;
    });
}
