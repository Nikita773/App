import { Observer } from '../../../../helpers/observer';
import DataBase from '../../../../helpers/db';
import { getDayFromDeadline } from '../../../../helpers/helpers';

export class DoneModel extends Observer {
    constructor() {
        super();
        this.db = DataBase;
        this.getData();
    }

    async getData() {
        this.state = await this.db.getData('tasks');

        this.state = this.state.filter((item) => {
            if (item.isDone) {
                return item;
            }
        });

        this.state = this.state.map((item) => {
            item.deadline = getDayFromDeadline(item.deadline);
            return item;
        });

        this.notify(this.state);
    }
}