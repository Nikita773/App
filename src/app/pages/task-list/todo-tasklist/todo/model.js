import { Observer } from '../../../../helpers/observer';
import DataBase from '../../../../helpers/db';
import { getDayFromDeadline } from '../../../../helpers/helpers';

export class TodoModel extends Observer {
    constructor() {
        super();
        this.db = DataBase;
        this.getData();
    }

    async getData() {
        this.state = await this.db.getData('tasks');

        this.state = this.state.map((item) => {
            item.deadline = getDayFromDeadline(item.deadline);
            return item;
        });

        this.notify(this.state);
    }
}