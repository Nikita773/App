import { SettingsModel } from './model';
import { CycleController } from './cycle/controller';
import { SettingsView } from './view';

export class SettingsController {
    constructor() {
        this.view = new SettingsView();
        this.model = new SettingsModel();
        this.cycleController = new CycleController();

        this.model.subscribe(this.cycleController.model.addState.bind(this.cycleController.model));

        this.model.subscribe(this.view.renderNumberInDom.bind(this.view));

        this.view.subscribe('inputWasChanged', this.model.changeState.bind(this.model));

        this.view.subscribe('Save settings', this.model.saveState.bind(this.model));
    }
}