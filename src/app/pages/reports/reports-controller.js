import { ReportsModel } from './reports-model';
import { ReportsView } from './reports-view';

export class ReportsController {
    constructor(status) {
        this.view = new ReportsView(status);
        this.model = new ReportsModel(status);

        this.model.subscribe("get-day-tasks", this.view.renderTasksData.bind(this.view));
        this.model.subscribe("get-day-pomodoros", this.view.renderPomodorosData.bind(this.view));
        this.model.subscribe("get-week-tasks", this.view.renderTasksData.bind(this.view));
        this.model.subscribe("get-week-pomodoros", this.view.renderPomodorosData.bind(this.view));
        this.model.subscribe("get-month-tasks", this.view.renderTasksData.bind(this.view));
        this.model.subscribe("get-month-pomodoros", this.view.renderPomodorosData.bind(this.view));
    }
}