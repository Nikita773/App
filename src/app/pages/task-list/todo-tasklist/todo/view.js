import * as toDoTab from "./todo.hbs";
import * as todoTabRemove from "./todo-remove.hbs";
import { EventEmitter } from "../../../../helpers/event-emmiter";

export class TodoView extends EventEmitter {
    constructor(mode) {
        super();

        this.mode = mode;

        this.showPopupHandlerVar = this.showPopupHandler.bind(this);
        this.findElements();
        this.addListeners();

        this.toggleHandlerVar = this.toggleHandler.bind(this);
    }

    findElements() {
        this.taskListSection = document.querySelector('.section-tasklist');
    }

    addListeners() {
        this.taskListSection.addEventListener('click', this.showPopupHandlerVar);
    }

    showPopupHandler(evt) {
        if (evt.target.classList.contains('icon-edit') || evt.target.closest('.edit-btn')) {
            this.emit('showEditTaskPopup', evt);
        }
    }

    toggleHandler(evt) {
        this.emit('Toggle global list', evt);
    }

    renderDailyTodos(state) {

        const firstTaskMessage = document.querySelector('.daily-task-message--first-task');

        const pageTabs = document.querySelectorAll('.page-tabs');

        const filteredArr = state.filter((item) => {
            if (!item.isDone) {
                return item;
            }
        });

        const dailyArr = state.filter((item) => {
            if (item.isDaily) {
                return item;
            }
        });

        const doneArr = state.filter((item) => {
            if (item.isDone) {
                return item;
            }
        });

        if (!filteredArr.length && !doneArr.length) {
            pageTabs.forEach((item) => {
                item.classList.add('disabled');
            });

            firstTaskMessage.classList.remove('disabled');
            if (document.querySelector('.global-list__trigger')) {
                document.querySelector('.global-list__trigger').remove();
            }

            return;

        } else {
            pageTabs.forEach((item) => {
                item.classList.remove('disabled');
            });
            firstTaskMessage.classList.add('disabled');

            if (document.querySelector('.global-list__trigger')) {
                document.querySelector('.global-list__trigger').remove();
            }

            const root = document.querySelector('.section-tasklist .container');
            root.insertAdjacentHTML('beforeend', `<a href="#" class="global-list__trigger" title="Go to global list">Global list
            <span class="icon icon-global-list-arrow-down"></span>
        </a>`);

            document.querySelector('.global-list__trigger').addEventListener('click', this.toggleHandlerVar);
        }

        const pageTabsMain = document.querySelector(".page-tabs--main");
        const pageTabsRemove = document.querySelector(".page-tabs--removed");

        const data = state.filter((item) => {
            if (item.isDaily) {
                return item;
            }
        });

        if (document.querySelector('.page-tabs__content--todo')) {
            document.querySelector('.page-tabs__content--todo').remove();
        }

        if (this.mode === 'common') {
            pageTabsMain.insertAdjacentHTML("afterbegin", toDoTab(data));

        } else if (this.mode === 'remove') {
            pageTabsRemove.insertAdjacentHTML('beforeend', todoTabRemove(data));
        }

        const dragDropMessage = document.querySelector('.daily-task-message--drag-drop');
        const doneMessage = document.querySelector('.daily-task-message--tasks-done');

        const anyTaskMessage = document.querySelector('.daily-task-message--any');

        if (!filteredArr.length && doneArr.length) {
            anyTaskMessage.classList.remove('disabled');
            pageTabs.forEach((item) => {
                item.classList.add('disabled');
            });
            if (document.querySelector('.global-list__trigger')) {
                document.querySelector('.global-list__trigger').remove();
            }

        } else {
            anyTaskMessage.classList.add('disabled');
        }

        if (!dailyArr.length && !doneArr.length) {
            dragDropMessage.classList.remove('disabled');
        }

        if (filteredArr.length && !dailyArr.length && doneArr.length) {
            doneMessage.classList.remove('disabled');
        }
    }
}