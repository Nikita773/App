import * as createCategoriesTab from "./categories.hbs";

export class InitCategories {
    constructor() {
        this.renderDom();
    }

    renderDom() {
        const rootWrapper = document.querySelector("#root .wrapper");
        while (rootWrapper.children.length) {
            rootWrapper.lastChild.remove();
        }
        rootWrapper.insertAdjacentHTML("afterbegin", createCategoriesTab());
    }

}