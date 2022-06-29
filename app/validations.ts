const validateEmail = async () => {
    let emailReg = /\S+@\S+\.\S+/;
    let emailVal = (<HTMLSelectElement> document.querySelector("#email"));

    if (emailVal.value.match(emailReg)) {
      console.log('Email Válido')
    }else{
      console.log('Email Inválido')
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