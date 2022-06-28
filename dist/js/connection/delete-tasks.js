function DeleteTask(cont) {
    let res = confirm("You confirm delete the task");
    if (res === true) {
        let all = document.querySelectorAll('.div-tasks');
        for (let i = 0; i < all.length; i++) {
            if (cont == all[i].id) {
                console.log(all[i]);
            }
        }
    }
    else {
        return;
    }
}
