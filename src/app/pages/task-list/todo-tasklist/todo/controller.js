import { TodoModel } from './model';
import { TodoView } from './view';
import DataBase from '../../../../helpers/db';

export class TodoController {
    constructor(mode) {
        this.model = new TodoModel();
        this.view = new TodoView(mode);
        this.db = DataBase;

        this.model.subscribe(this.view.renderDailyTodos.bind(this.view));

        /*DB SUBSCRIBERS*/
        this.db.subscribe('Data changed', this.model.getData.bind(this.model));
    }
}