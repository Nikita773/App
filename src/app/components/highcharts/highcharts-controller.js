import { HighchartsModel } from "./highcharts-model";
import { HighchartsView } from "./highcharts-view";

export class HighchartsController {
    constructor(data, status) {
        this.model = new HighchartsModel(data, status);
        this.view = new HighchartsView();

        this.model.subscribe('Series was received', this.view.renderHighcharts.bind(this.view));
    }
}