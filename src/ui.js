class UI {
    constructor () {
        this.cards = document.querySelector('#cards');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
    }

    /*Load all tasks*/
    showTasks(tasks) {
        let output = '';

        tasks.forEach((task) => {
            if (task.done === "false") {
                output += `
                <div class="card-item">
                <div class="card">
                    <div class="card-img" style="background-image: url(${task.img_url});"></div>
                    <div class="card-title">${task.title}</div>
                    <div class="card-content">
                        <p class="card-body">${task.body}</p>
                        <a href="#" class="btn btn-remove task-control" data-id="${task.id}" data-done="${task.done}">remove</a>
                    </div>
                </div>
                </div>
                `;
            }
        });

        this.cards.innerHTML = output;
    }

    showRemovedTasks (tasks) {
        let output = '';

        tasks.forEach((task) => {
            if (task.done === "true") {
                output += `
                <div class="card-item">
                <div class="card">
                    <div class="card-img" style="background-image: url(${task.img_url});"></div>
                    <div class="card-title">${task.title}</div>
                    <div class="card-content">
                        <p class="card-body">${task.body}</p>
                        <div class="card-removed-buttons">
                            <a href="#" class="btn btn-remove remove-task" data-id="${task.id}"> remove forever</a>
                            <a href="#" class="btn btn-restore task-control" data-id="${task.id}" data-done="${task.done}">restore</a>
                        </div>
                    </div>
                </div>
                </div>
                `;
            }
        });
        
        this.cards.innerHTML = output;
    }

    showAlert (message, background) {
            const divAlert = document.createElement('div');
            const pTextAlert = document.createElement('p');
            const body = document.body;

            divAlert.appendChild(pTextAlert);
            divAlert.className = 'alert';
            pTextAlert.className = 'alert-removed';
            
            if (background) {
                pTextAlert.style.backgroundColor = background;
            }
            pTextAlert.appendChild(document.createTextNode(message));

            body.appendChild(divAlert);

            setTimeout(() => {
                divAlert.parentNode.removeChild(divAlert);
            }, 5000);
    }
}

export default UI;