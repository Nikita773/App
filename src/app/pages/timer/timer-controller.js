import { TimerModel } from './timer-model';
import { TimerView } from './timer-view';

export class TimerController {
    constructor() {
        this.model = new TimerModel();
        this.view = new TimerView();

        this.model.subscribe('Render timer page', this.view.renderFirstPageTimer.bind(this.view));
        this.view.subscribe('Send done task to db', this.model.sendDoneTaskToDb.bind(this.model));
    }

}