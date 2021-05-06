import { Observer } from '../../../../helpers/observer';
import DataBase from '../../../../helpers/db';

export class EditTaskModel extends Observer {
    constructor() {
        super();
        this.db = DataBase;
    }

    setData(data) {
        this.db.setData('tasks', data.id, data);
    }
    updateData(data) {
        if(typeof data.deadline === 'object') {
            data.deadline = data.deadline.toLocaleString().slice(0, 10).split('.').reverse().join('-');
        }
        this.db.updateData('tasks', String(data.id), data, data.notification);
    }
    deleteData(currentID) {
        this.db.deleteData('tasks', String(currentID));
    }
}