function validationInputsUser() {
    let name = (<HTMLSelectElement>document.getElementById('name')).value; 
    let cpf = (<HTMLSelectElement>document.getElementById('cpf')).value;
    let birthDate = (<HTMLSelectElement>document.getElementById('birthDate')).value;
    let email = (<HTMLSelectElement>document.getElementById('email')).value; 
    let password = (<HTMLSelectElement>document.getElementById('password')).value;
    let address = (<HTMLSelectElement>document.getElementById('address')).value; 
    let number = (<HTMLSelectElement>document.getElementById('number')).value; 
    let complement = (<HTMLSelectElement>document.getElementById('complement')).value;
    let city = (<HTMLSelectElement>document.getElementById('city')).value;
    let state =(<HTMLSelectElement>document.getElementById('state')).value;  
    let country = (<HTMLSelectElement>document.getElementById('country')).value;
    let desczipCodeiption = (<HTMLSelectElement>document.getElementById('desczipCodeiption')).value;

    console.log('importou')

    /*if (description.length < 1) {
        msgHHTML = `<p class="error-input">Description cannot be null</p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg1')).innerHTML = msgHHTML;
        validating = false;
    }else if (description.length > 0) {
        msgHHTML = `<p class="error-input"></p>`;
        (<HTMLSelectElement>document.querySelector('.input-error-msg1')).innerHTML = msgHHTML;
    }*/



    const validateEmail = async () => {
        let emailReg = /\S+@\S+\.\S+/;
        let emailVal = (<HTMLSelectElement> document.querySelector("#email"));
    
        if (emailVal.value.match(emailReg)) {
          console.log('Email Válido')
        }else{
          console.log('Email Inválido')
        }
    }
    
}


const cpfMask = async () => {
    let cpfNum = (<HTMLSelectElement> document.querySelector("#cpf"));
    let cpfReg = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    
    cpfNum.value = cpfNum.value
    .replace(/\D/g,"")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d{1,2})$/,"$1-$2")
}

const dateMask = async (input : string) => {
    let dateNum = (<HTMLSelectElement> document.querySelector("#"+input));
    let dateReg = /([0-9]{2}[\/]?[0-9]{2}[\/]?[0-9]{2})/;
    
    dateNum.value = dateNum.value
    .replace(/\D/g,"")
    .replace(/(\d{2})(\d)/,"$1/$2")
    .replace(/(\d{2})(\d)/,"$1/$2")
}

const timeMask = async (input : string) => {
    let timeNum = (<HTMLSelectElement> document.querySelector("#time"));
    let timeReg = /([0-9]{2}[\:]?[0-9]{2}[\:]?[0-9]{2})/;
    
    timeNum.value = timeNum.value
    .replace(/\D/g,"")
    .replace(/(\d{2})(\d)/,"$1:$2")
}

const zipCodeMask = async () => {
    let zipCodeNum = (<HTMLSelectElement> document.querySelector("#zipCode"));
    console.log(zipCodeNum)
    let zipCodeReg = /([0-9]{5}[\-]?[0-9]{3})/;
    
    zipCodeNum.value = zipCodeNum.value
    .replace(/\D/g,"")
    .replace(/(\d{5})(\d)/,"$1-$2")
}