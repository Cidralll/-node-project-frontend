var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function validationInputsUser() {
    let name = document.getElementById('name').value;
    let cpf = document.getElementById('cpf').value;
    let birthDate = document.getElementById('birthDate').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;
    let complement = document.getElementById('complement').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let country = document.getElementById('country').value;
    let desczipCodeiption = document.getElementById('desczipCodeiption').value;
    console.log('importou');
    /*if (description.length < 1) {
        msgHHTML = `<p class="error-input">Description cannot be null</p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg1')).innerHTML = msgHHTML;
        validating = false;
    }else if (description.length > 0) {
        msgHHTML = `<p class="error-input"></p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg1')).innerHTML = msgHHTML;
    }*/
    const validateEmail = () => __awaiter(this, void 0, void 0, function* () {
        let emailReg = /\S+@\S+\.\S+/;
        let emailVal = document.querySelector("#email");
        if (emailVal.value.match(emailReg)) {
            console.log('Email Válido');
        }
        else {
            console.log('Email Inválido');
        }
    });
}
const cpfMask = () => __awaiter(this, void 0, void 0, function* () {
    let cpfNum = document.querySelector("#cpf");
    let cpfReg = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    cpfNum.value = cpfNum.value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});
const dateMask = (input) => __awaiter(this, void 0, void 0, function* () {
    let dateNum = document.querySelector("#" + input);
    let dateReg = /([0-9]{2}[\/]?[0-9]{2}[\/]?[0-9]{2})/;
    dateNum.value = dateNum.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2");
});
const timeMask = (input) => __awaiter(this, void 0, void 0, function* () {
    let timeNum = document.querySelector("#time");
    let timeReg = /([0-9]{2}[\:]?[0-9]{2}[\:]?[0-9]{2})/;
    timeNum.value = timeNum.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1:$2");
});
const zipCodeMask = () => __awaiter(this, void 0, void 0, function* () {
    let zipCodeNum = document.querySelector("#zipCode");
    console.log(zipCodeNum);
    let zipCodeReg = /([0-9]{5}[\-]?[0-9]{3})/;
    zipCodeNum.value = zipCodeNum.value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2");
});
