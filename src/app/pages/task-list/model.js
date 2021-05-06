import { Observer } from '../../helpers/observer';
import DataBase from '../../helpers/db';

export class TaskListModel extends Observer {
    constructor() {
        super();
        this.db = DataBase;
    }

    async getState(evt) {
        this.state = await this.db.getData('tasks');
        this.notify({ state: this.state, evt });
    }
}