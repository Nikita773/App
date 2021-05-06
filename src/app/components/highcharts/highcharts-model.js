import { calculateDiffDays } from '../../helpers/helpers';
import { createDateArr } from '../../helpers/helpers';
import { EventEmitter } from "../../helpers/event-emmiter";

export class HighchartsModel extends EventEmitter {
    constructor(data, status) {
        super();
        this.type = status.type;
        this.period = status.period;
        this.calculateDiffDays = calculateDiffDays;
        this.createDateArr = createDateArr;

        this.series = [
            { name: 'Urgent', data: [], color: '#f15a49' },
            { name: 'High', data: [], color: '#fea83f' },
            { name: 'Middle', data: [], color: '#fddd41' },
            { name: 'Low', data: [], color: '#13bc9c' },
            { name: 'Failed', data: [], color: '#8ea6b9' }
        ];

        this.preparationData(data, this.period);
    }

    preparationData(data, period) {

        if (period === 'day') {
            this.urgent = Array(5).fill(0);
            this.high = Array(5).fill(0);
            this.middle = Array(5).fill(0);
            this.low = Array(5).fill(0);
            this.failed = Array(5).fill(0);

            data.forEach((task) => {
                this.urgent[0] += task.urgent;
                this.high[1] += task.high;
                this.middle[2] += task.middle;
                this.low[3] += task.low;
                this.failed[4] += task.failed;
            });

        } else if (period === 'week') {
            this.urgent = Array(7).fill(0);
            this.high = Array(7).fill(0);
            this.middle = Array(7).fill(0);
            this.low = Array(7).fill(0);
            this.failed = Array(7).fill(0);

            let allWeekDays = this.createDateArr(7);

            data.forEach((task) => {
                if (allWeekDays.indexOf(task.date)) {
                    const diffDays = this.calculateDiffDays(task.date);
                    this.urgent[7 - diffDays] += task.urgent;
                    this.high[7 - diffDays] += task.high;
                    this.middle[7 - diffDays] += task.middle;
                    this.low[7 - diffDays] += task.low;
                    this.failed[7 - diffDays] += task.failed;
                }
            });
        } else if (period === 'month') {

            this.urgent = Array(30).fill(0);
            this.high = Array(30).fill(0);
            this.middle = Array(30).fill(0);
            this.low = Array(30).fill(0);
            this.failed = Array(30).fill(0);

            let allMonthDay = this.createDateArr(30);

            data.forEach((task) => {
                if (allMonthDay.indexOf(task.date)) {

                    const diffDays = this.calculateDiffDays(task.date);

                    this.urgent[30 - diffDays] += task.urgent;
                    this.high[30 - diffDays] += task.high;
                    this.middle[30 - diffDays] += task.middle;
                    this.low[30 - diffDays] += task.low;
                    this.failed[30 - diffDays] += task.failed;
                }
            });
        }
        this.series[0].data = this.urgent;
        this.series[1].data = this.high;
        this.series[2].data = this.middle;
        this.series[3].data = this.low;
        this.series[4].data = this.failed;

        setTimeout(() => {
            this.emit('Series was received', { series: this.series, period: this.period, type: this.type });
        }, 0);

        return this.series;
    }
}