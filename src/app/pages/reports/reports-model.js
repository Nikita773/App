import DataBase from '../../helpers/db';
import { EventEmitter } from '../../helpers/event-emmiter';

export class ReportsModel extends EventEmitter {
    constructor(status) {
        super();
        this.status = status;
        this.db = DataBase;
        this.getData();
    }

    async getData() {
        const tasks = await this.db.getData('tasks');
        this.tasks = this.filterTasksByDone(tasks);

        const monthData = this.filterExistingTasksByPeriod(this.tasks, 31);
        this.monthTasksData = this.collectTasksData(monthData);
        this.monthPomodorosData = this.collectPomodorosData(monthData);

        const weekData = this.filterExistingTasksByPeriod(this.tasks, 7);
        this.weekTasksData = this.collectTasksData(weekData);
        this.weekPomodorosData = this.collectPomodorosData(weekData);

        const dayData = this.filterExistingTasksByPeriod(this.tasks, 0);
        this.dayTasksData = this.collectTasksData(dayData);
        this.dayPomodorosData = this.collectPomodorosData(dayData);


        this.transferDataToNeededRoute();
    }

    filterTasksByDone = (tasks) => {
        const doneTasks = [];
        const result = {};

        tasks.forEach((el) => {
            if (el !== null && el.isDone && el.completeDate !== "")
                doneTasks.push(el);
        });

        for (let e of doneTasks) {
            if (result[e["completeDate"]]) result[e["completeDate"]].push(e);
            else result[e["completeDate"]] = [e];
        }

        return result;
    };

    filterExistingTasksByPeriod = (tasks, period) => {

        const periodTasks = tasks;

        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        );

        const lastDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - period
        );

        for (let date in periodTasks) {
            if (
                this.makeDateFromString(date).getTime() > today.getTime() ||
                this.makeDateFromString(date).getTime() < lastDate.getTime()
            ) {
                delete periodTasks[date];
            }
        }

        return periodTasks;
    };

    makeDateFromString = (date) => {
        return new Date(date);
    };

    collectPomodorosData = (data) => {
        const result = [];

        for (let el in data) {
            let date = el,
                urgent = 0,
                high = 0,
                middle = 0,
                low = 0,
                failed = 0;

            const tasks = data[el];

            for (let task of tasks) {

                failed += task.failed;

                const priority = task.priority;

                switch (priority) {
                    case "urgent":
                        urgent += task.estimation - task.failed;
                        break;
                    case "high":
                        high += task.estimation - task.failed;
                        break;
                    case "middle":
                        middle += task.estimation - task.failed;
                        break;
                    case "low":
                        low += task.estimation - task.failed;
                        break;
                    default:
                        alert("something wrong in pomodoros table counting");
                        break;
                }
            }

            result.push({
                date: date,
                urgent: urgent,
                high: high,
                middle: middle,
                low: low,
                failed: failed,
            });
        }
        return result;
    };

    collectTasksData = (data) => {
        const result = [];

        for (let el in data) {
            let date = el,
                urgent = 0,
                high = 0,
                middle = 0,
                low = 0,
                failed = 0;

            const tasks = data[el];

            for (let task of tasks) {
                if (task.failed > task.estimation - task.failed) {
                    failed += 1;
                } else {
                    const priority = task.priority;

                    switch (priority) {
                        case "urgent":
                            urgent += 1;
                            break;
                        case "high":
                            high += 1;
                            break;
                        case "middle":
                            middle += 1;
                            break;
                        case "low":
                            low += 1;
                            break;
                        default:
                            alert("something wrong in tasks table counting");
                            break;
                    }
                }
            }

            result.push({
                date: date,
                urgent: urgent,
                high: high,
                middle: middle,
                low: low,
                failed: failed,
            });
        }

        return result;
    };

    transferDataToNeededRoute = () => {
        const currentTypeFunc = this.status.period + this.toCamelCase(this.status.type) + 'Data';
        this.emit(`get-${this.status.period}-${this.status.type}`, this[currentTypeFunc]);
    };

    toCamelCase(str) {
        return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
            return match.charAt(match.length - 1).toUpperCase();
        });
    }
}