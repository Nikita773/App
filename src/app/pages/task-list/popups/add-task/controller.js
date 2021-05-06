import { AddTaskModel } from './model';
import { AddTaskView } from './view';

export class AddTaskController {
    constructor() {
        this.model = new AddTaskModel();
        this.view = new AddTaskView();

        this.view.subscribe('Add task', this.model.addData.bind(this.model));
    }
}