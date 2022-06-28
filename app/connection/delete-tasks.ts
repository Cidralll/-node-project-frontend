function DeleteTask(cont) {
    let res = confirm("You confirm delete the task")
    if(res === true) {
        let all = (<HTMLSelectElement><unknown>document.querySelectorAll('.div-tasks'));
        for(let i = 0; i < all.length; i++) {
            if(cont == all[i].id) {
                console.log(all[i])
                let id = (<HTMLSelectElement>document.querySelector('.id'));
                console.log(id.id)
                Delete(id.id)
                location.reload()
            }
        }
    }else {
        return
    }
    
}

async function Delete(id) {
    let request = await fetch(`http://127.0.0.1:8080/api/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    return request
}