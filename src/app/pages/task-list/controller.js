import { TaskListModel } from './model';
import { TaskListView } from './view';
import { AddTaskController } from './popups/add-task/controller';
import EditTaskController from './popups/edit-task/controller';
import { GlobalController } from './global-tasklist/todo/controller';
import { TodoController } from './todo-tasklist/todo/controller';
import { DoneController } from './todo-tasklist/done/controller';

export class TaskListController {
    constructor(mode) {
        this.model = new TaskListModel();
        this.view = new TaskListView();

        this.todoController = new TodoController(mode);
        this.doneController = new DoneController();
        this.globalController = new GlobalController(mode);

        this.addTaskController = new AddTaskController();
        this.editTaskController = EditTaskController;

        this.view.subscribe('showAddTaskPopup', this.addTaskController.view.renderAddTaskPopup.bind(this.addTaskController.view));

        this.globalController.view.subscribe('showEditTaskPopup', this.model.getState.bind(this.model));
        this.view.subscribe('showEditTaskPopup', this.model.getState.bind(this.model));
        this.model.subscribe(this.editTaskController.view.renderEditTaskPopup.bind(this.editTaskController.view));

        this.view.subscribe('Add to daily', this.editTaskController.view.addToDailyTask.bind(this.editTaskController.view));

        this.todoController.view.subscribe('Toggle global list', this.globalController.view.toggleHandlerVar.bind(this.globalController.view));
    }

    // createRemoveHelper() {
    //     this.removeHelper = new RemoveHelper();
    // }
}