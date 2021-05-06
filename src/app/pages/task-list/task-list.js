import { TaskListController } from './controller';

export class InitTasks {
    constructor(mode) {
        this.taskListController = new TaskListController(mode);

        this.taskListController.view.subscribe('Add common mode', this.createCommonModeController.bind(this));
    }
    createCommonModeController() {
        this.taskListController = new TaskListController('common');
    }
}