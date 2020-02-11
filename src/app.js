import './main.scss';
import UI from './ui';
import { get, post, put, patch, remove } from './helpers'

const ui = new UI();

class HttpHelper {
    constructor(url) {
        this.url = url;
    }

    async getTasks() {
        console.log(this.url);

        try {
            const data = await get(this.url);
            ui.showTasks(data);
        } catch (error) {
            console.error(error);
            ui.showAlert('Server Error');
        }
    }

    async postTask(data) {
        try {
            await post(this.url, data);
            ui.showAlert('Task is added');
            await this.getTasks();
        } catch (error) {
            console.error(error);
            ui.showAlert('Server Error');
        }
    }

    async patchTask(id, prop) {

        const currentTask = `${this.url}/${id}`

        try {
            await patch(currentTask, {
                done: prop
            });
            prop === "false" ? ui.showAlert('Task is restored') : ui.showAlert('Task is removed');
            await this.getTasks();
        } catch (error) {
            console.error(error);
            ui.showAlert('Server Error');
        }

    }

    async showRemovedTasks() {
        try {
            const data = await get(this.url);
            ui.showRemovedTasks(data)
        } catch (error) {
            console.error(error);
            ui.showAlert('Server Error');
        }
    }

    async removeTask(id) {

        const currentTask = `${this.url}/${id}`;

        try {
            await remove(currentTask);
            ui.showAlert('Task is removed');
            await this.showRemovedTasks();
        } catch (error) {
            console.error(error);
            ui.showAlert('Server Error');
        }
    }
}

class TaskManager {

    httpHelper = new HttpHelper("http://localhost:3000/Tasks");

    constructor() {

        this.addTaskButton = document.querySelector('.add-task');
        this.showRemovedButton = document.querySelector('.showRemovedTasks');
        this.showTasksButton = document.querySelector('.showTasks');
        this.removeTask = document.querySelector('#cards');
        this.upload = document.querySelector("#uploadFile");
    }

    async addTask(e) {
        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;
        const img = this.upload.files[0];

        const done = "false";

        if (title && body && img) {

            let reader = new FileReader();
            reader.readAsDataURL(img);

            reader.onloadend = async () => {
                const data = {
                    title,
                    body,
                    done,
                    img_url: reader.result
                }

                await this.httpHelper.postTask(data);
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

    async removeTasks(e) {
        if (e.target.classList.contains('task-control')) {
            const id = e.target.dataset.id;
            const isDone = e.target.dataset.done;

            if (isDone === "true") {
                await this.httpHelper.patchTask(id, "false");
            }
            else {
                await this.httpHelper.patchTask(id, "true");
            }
        }

        if (e.target.classList.contains('remove-task')) {

            const id = e.target.dataset.id;

            await this.httpHelper.removeTask(id);
        }

        e.preventDefault();
    }

    uploadFile() {
        let image = this.upload.files[0];
        const isImage = /^image\//;
        const uploadLabel = document.querySelector('.uploadFile-label');

        if (isImage.test(image.type)) {
            uploadLabel.textContent = image.name;
        }
        else {
            uploadLabel.textContent = 'Select a image file !!!';
            ui.showAlert('Select a image file !!!', '#e82063');
            this.upload.value = '';
        }
    }

    async showRemovedTasks() {
        await this.httpHelper.showRemovedTasks();
    }

    init() {
        this.httpHelper.getTasks();
        this.addTaskButton.addEventListener('click', e => this.addTask(e));
        this.showRemovedButton.addEventListener('click', e => this.showRemovedTasks(e));
        this.showTasksButton.addEventListener('click', () => this.httpHelper.getTasks());
        this.removeTask.addEventListener('click', e => this.removeTasks(e));
        this.upload.addEventListener('change', () => this.uploadFile());
    }
}

const taskManager = new TaskManager();
taskManager.init();