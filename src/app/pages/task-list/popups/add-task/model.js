import { Observer } from '../../../../helpers/observer';
import DataBase from '../../../../helpers/db';

export class AddTaskModel extends Observer {
    constructor() {
        super();
        this.db = DataBase;
    }

    addData(data) {
        const itemID = `${new Date().getTime()}`;
        data.id = itemID;

        if(typeof data.deadline === 'object') {
            data.deadline = data.deadline.toLocaleString().slice(0, 10).split('.').reverse().join('-');
        }
        this.db.setData('tasks', itemID, data);
    }
}