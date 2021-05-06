import * as doneTab from "./done.hbs";
import { EventEmitter } from "../../../../helpers/event-emmiter";

export class DoneView extends EventEmitter {
    constructor() {
        super();
    }

    renderDoneTodos(state) {
        const pageTabsMain = document.querySelector(".page-tabs--main");
        let doneContent = document.querySelector('.page-tabs__content--done');
        if (doneContent) {
            doneContent.remove();
        }

        pageTabsMain.insertAdjacentHTML("beforeend", doneTab(state));
    }
}