import { Observer } from '../../../helpers/observer';
import DataBase from '../../../helpers/db';

export class SettingsModel extends Observer {
    constructor() {
        super();
        this.db = DataBase;
        this.getData();
    }

    async getData() {
        this.state = await this.db.getData('settings', 'state');
        this.notify(this.state);
    }

    changeState(data) {
        if (data.id === 'work_time') {
            if (data.event === 'minus' && this.state.work_time > 15) {
                this.state.work_time -= 5;
            }
            if (data.event === 'plus' && this.state.work_time < 25) {
                this.state.work_time += 5;
            }
            this.notify(this.state);
        }

        if (data.id === 'work_iterations') {
            if (data.event === 'minus' && this.state.work_iterations > 2) {
                this.state.work_iterations -= 1;
            }
            if (data.event === 'plus' && this.state.work_iterations < 5) {
                this.state.work_iterations += 1;
            }
            this.notify(this.state);
        }

        if (data.id === 'short_break') {
            if (data.event === 'minus' && this.state.short_break > 3) {
                this.state.short_break -= 1;
            }
            if (data.event === 'plus' && this.state.short_break < 5) {
                this.state.short_break += 1;
            }
            this.notify(this.state);
        }

        if (data.id === 'long_break') {
            if (data.event === 'minus' && this.state.long_break > 15) {
                this.state.long_break -= 5;
            }
            if (data.event === 'plus' && this.state.long_break < 30) {
                this.state.long_break += 5;
            }
            this.notify(this.state);
        }
    }

    saveState() {
        this.db.updateData('settings', 'state', this.state, 'settings');
    }
};