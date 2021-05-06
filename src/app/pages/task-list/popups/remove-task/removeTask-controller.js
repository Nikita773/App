import { removeTaskModel } from "./removeTask-model";
import { removeTaskView } from "./removeTask-view";

export class removeTaskController {
    constructor(tasks) {
        this.model = new removeTaskModel(tasks);
        this.view = new removeTaskView();

        this.model.subscribe('Transfer tasks to view', this.view.renderRemovePopup.bind(this.view));
        this.view.subscribe('Remove tasks from db', this.model.removeTasksFromData.bind(this.model));
    }
}