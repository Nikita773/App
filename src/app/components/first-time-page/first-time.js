import * as home from "./first-time.hbs";

export class FirstTimePage {
    constructor() {
        this.renderFirstTimePage();
    }

    renderFirstTimePage() {
        const rootWrapper = document.querySelector("#root .wrapper");

        while (rootWrapper.children.length) {
            rootWrapper.lastChild.remove();
        }

        rootWrapper.insertAdjacentHTML("beforeend", home());
    }
}