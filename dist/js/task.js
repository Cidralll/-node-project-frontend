var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function Submit() {
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let user = document.getElementById('user').value;
}
GetData();
function GetData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:8080/api/v1/users');
            const data = yield response.json();
            list(data);
        }
        catch (error) {
            console.log("Erro!");
        }
    });
}
function list(users) {
    let output = '';
    for (let user of users) {
        output += `
            <option value="${user.id}">${user.user}</option>
        `;
    }
    document.querySelector('.select').innerHTML = output;
}
