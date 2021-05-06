import { GlobalModel } from './model';
import { GlobalView } from './view';
import EditTaskController from '../../popups/edit-task/controller';
import DataBase from '../../../../helpers/db';

export class GlobalController {
    constructor(mode) {
        this.model = new GlobalModel();
        this.view = new GlobalView(mode);
        this.editTaskController = EditTaskController;
        this.db = DataBase;

        /*MODEL SUBSCRIBERS*/

        this.model.subscribe('Get data like group', this.view.renderGlobalList.bind(this.view));
        this.model.subscribe('Get data for filters', this.view.renderCategories.bind(this.view));

        /*VIEW SUBSCRIBERS*/

        this.view.subscribe('Render categories', this.model.groupCategories.bind(this.model));
        this.view.subscribe('Filter categories', this.model.filterByPriority.bind(this.model));

        /*EDIT TASK VIEW SUBSCRIBERS*/

        this.view.subscribe('Add to daily', this.editTaskController.view.addToDailyTask.bind(this.editTaskController.view));

        /*DB SUBSCRIBERS*/
        this.db.subscribe('Data changed', this.model.getData.bind(this.model));
    }


}