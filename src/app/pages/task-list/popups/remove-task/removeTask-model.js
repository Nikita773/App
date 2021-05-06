import { EventEmitter } from "../../../../helpers/event-emmiter";
import db from "../../../../helpers/db";

export class removeTaskModel extends EventEmitter {
    constructor(tasks) {
        super();
        this.db = db;
        this.tasks = tasks;
        this.transferTasksToView();
    }

    transferTasksToView() {
        setTimeout(() => {
            this.emit('Transfer tasks to view', this.tasks);
        }, 0);
    }

    removeTasksFromData(tasks) {
        this.db.deleteData('tasks', tasks);
    }
}