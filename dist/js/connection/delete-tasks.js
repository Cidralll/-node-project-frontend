var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function DeleteTask(cont) {
    let res = confirm("You confirm delete the task");
    if (res === true) {
        let all = document.querySelectorAll('.div-tasks');
        for (let i = 0; i < all.length; i++) {
            if (cont == all[i].id) {
                console.log(all[i]);
                let id = document.querySelector('.id');
                console.log(id.id);
                Delete(id.id);
            }
        }
    }
    else {
        return;
    }
}
function Delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let request = yield fetch(`http://127.0.0.1:8080/api/v1/tasks/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return request;
    });
}
