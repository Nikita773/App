import { HighchartsController } from "./highcharts-controller";

export function renderHighcharts(data, status) {
    new HighchartsController(data, status);
}