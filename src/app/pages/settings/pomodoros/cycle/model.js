import { Observer } from "../../../../helpers/observer";
import DataBase from '../../../../helpers/db';

export class CycleModel extends Observer {
    constructor() {
        super();
        this.db = DataBase;
        this.getData();
    }

    async getData() {
        this.state = await this.db.getData('settings', 'state');
        this.addState(this.state);
    }

    addState(state) {
        this.iterations = state.work_iterations;
        this.workTime = state.work_time;
        this.shortBreak = state.short_break;
        this.longBreak = state.long_break;
        this.timePeriod = state.time_period;

        this.firstCycle = ((this.workTime + this.shortBreak) * this.iterations + this.longBreak) - this.shortBreak;
        this.allIterationsTime = ((this.workTime + this.shortBreak) * this.iterations + this.firstCycle) - this.shortBreak;

        this.workTimeBarWidth = 100 * this.workTime / this.allIterationsTime;
        this.shortBreakBarWidth = 100 * this.shortBreak / this.allIterationsTime;
        this.longBreakBarWidth = 100 * this.longBreak / this.allIterationsTime;

        this.timeLineIterations = Math.floor(this.allIterationsTime / this.timePeriod);
        this.timeBlockWidth = 100 * this.timePeriod / this.allIterationsTime;

        this.notify({
            iterations: this.iterations,
            timePeriod: this.timePeriod,
            firstCycle: this.firstCycle,
            allIterationsTime: this.allIterationsTime,
            workTimeBarWidth: this.workTimeBarWidth,
            shortBreakBarWidth: this.shortBreakBarWidth,
            longBreakBarWidth: this.longBreakBarWidth,
            timeLineIterations: this.timeLineIterations,
            timeBlockWidth: this.timeBlockWidth
        });
    }
}