var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function GetTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://127.0.0.1:8080/api/v1/tasks');
            const data = yield response.json();
            console.log(data);
            listTask(data);
        }
        catch (error) {
            console.log("Erro!");
        }
    });
}
function listTask(names) {
    let output = '';
    for (let name of names) {
        output += `
            <div class="div-tasks">
                <div>

                </div>
                <h2>Description: ${name.description}</h2>
                <h2>Date task: ${name.date}</h2>
                <h2>Userame: ${name.user}</h2>
                <div class="border"></div>
            </div>
        `;
    }
    document.querySelector('.main-list-tasks').innerHTML = output;
}
GetTasks();
