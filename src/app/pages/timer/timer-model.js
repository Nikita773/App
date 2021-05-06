import { EventEmitter } from "../../helpers/event-emmiter";
import DataBase from "../../helpers/db";

export class TimerModel extends EventEmitter {
    constructor() {
        super();
        this.db = DataBase;
        this.getData();
    }

    async getData() {
        this.currentID = localStorage.getItem('currentID');
        this.task = await this.db.getData('tasks', this.currentID);
        this.settings = await this.db.getData('settings');
        this.state = Object.assign(this.task, this.settings[0]);

        this.emit('Render timer page', this.state);
    }

    sendDoneTaskToDb(task) {
        this.db.completeTaskUpdateData('tasks', String(task.id), task, task.notification);
    }
}