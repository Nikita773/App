import DataBase from '../../../../helpers/db';
import { EventEmitter } from '../../../../helpers/event-emmiter';
import { getDayFromDeadline } from '../../../../helpers/helpers';

export class GlobalModel extends EventEmitter {
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
        if (!this.state.length) {
            this.groupCategories(false);
        } else {
            this.groupCategories();
        }
    }

    groupCategories(bool) {

        if (bool === false) {
            return;
        }

        const data = this.state.filter((item) => {
            if (!item.isDaily && !item.isDone) {
                return item;
            }
        });

        const property = 'category';

        let result = {};

        for (let e of data) {
            if (result[e[property]]) {
                result[e[property]].push(e);
            } else {
                result[e[property]] = [e];
            }
        }

        this.state = result;
        this.emit('Get data like group', result);
    }

    filterByPriority(value) {
        const data = Object.assign({}, this.state);

        if (value === 'all') {
            this.emit('Get data for filters', data);
            return;
        }

        for (let key in data) {
            data[key] = data[key].filter((item) => {
                if (item.priority === value) {
                    return item;
                }
            });
        }

        this.emit('Get data for filters', data);
    }
}