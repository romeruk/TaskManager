import './main.scss';
import UI from './ui';
import {get, post, put, patch, remove} from './helpers'

const ui = new UI();

class TaskManager {
    constructor () {
        this.url = "http://localhost:3000/Tasks";
        this.addTaskButton = document.querySelector('.add-task');
        this.showRemovedButton = document.querySelector('.showRemovedTasks');
        this.showTasksButton = document.querySelector('.showTasks');
        this.removeTask = document.querySelector('#cards');
        this.upload = document.querySelector("#uploadFile");
    }

    getTasks () {
        get(this.url)
        .then(data => ui.showTasks(data))
        .catch(error => console.error(error));
    }

    addTask (e) {
        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;
        const img = this.upload.files[0];

        const done = "false";
    
        if (title && body && img) {

            let reader = new FileReader();
            reader.readAsDataURL(img);
    
            reader.onloadend =  () => {
                const data = {
                    title,
                    body,
                    done,
                    img_url: reader.result
                }
                post(this.url, data)
                .then(data => {
                    this.getTasks();
                    ui.showAlert('Task is added');
                })
                .catch(error => console.error(error));    
            }
        }
        else if (!title || !body) {
            ui.showAlert('fill out the task title and body', '#e82063');
        }
        else {
            ui.showAlert('Select a image file', '#e82063');
        }
        e.preventDefault();
    }

    removeTasks (e) {
        if(e.target.classList.contains('task-control')) {
            const id = e.target.dataset.id;
            const isDone = e.target.dataset.done;
            const currentTask = `${this.url}/${id}`;

            if (isDone === "true") {
                patch(currentTask, {
                    done: "false"
                })
                .then(data => {
                    ui.showAlert('Task is restored');
                    this.getTasks()
                })
                .catch(error => console.error(error))
            }
            else {
                patch(currentTask, {
                    done: "true"
                })
                .then(data => this.getTasks())
                .catch(error => console.error(error))
            }
        }

        if(e.target.classList.contains('remove-task')) {
        
            const id = e.target.dataset.id;
            const currentTask = `${this.url}/${id}`

            remove(currentTask)
            .then(data => {
                ui.showAlert('Task is removed');
                this.showRemovedTasks();
            })
            .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    uploadFile () {
        let image = this.upload.files[0];
        const isImage = /^image\//;
        const uploadLabel = document.querySelector('.uploadFile-label');

        if(isImage.test(image.type)) {
            uploadLabel.textContent = image.name;
        }
        else {
            uploadLabel.textContent = 'Select a image file !!!';
            ui.showAlert('Select a image file !!!', '#e82063');
            this.upload.value = '';
        }
    }

    showRemovedTasks () {
            get(this.url)
            .then(data => ui.showRemovedTasks(data))
            .catch(error => console.error(error));
    }

    init () {
        this.getTasks();
        this.addTaskButton.addEventListener('click', e => this.addTask(e));
        this.showRemovedButton.addEventListener('click', e => this.showRemovedTasks(e));
        this.showTasksButton.addEventListener('click', () => this.getTasks());
        this.removeTask.addEventListener('click', e => this.removeTasks(e));
        this.upload.addEventListener('change', () => this.uploadFile());
    }
}

const taskManager = new TaskManager();
taskManager.init();