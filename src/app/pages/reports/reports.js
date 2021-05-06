import { ReportsController } from './reports-controller';

export class Reports {
    constructor(status) {
        this.controller = new ReportsController(status);
    }
}