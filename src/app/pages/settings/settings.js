import { SettingsController } from "./pomodoros/controller";
import { CycleController } from "./pomodoros/cycle/controller";

export class InitSettings {
    constructor() {
        this.initSettings();
    }

    initSettings() {
        new SettingsController();
        new CycleController();
    }

}