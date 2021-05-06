import { CycleModel } from "./model";
import { CycleView } from "./view";

export class CycleController {
    constructor() {
        this.view = new CycleView();
        this.model = new CycleModel();

        this.model.subscribe(this.view.renderCycle.bind(this.view));
    }
}