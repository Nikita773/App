import * as taskList from "./task-list.hbs";
import { EventEmitter } from "../../helpers/event-emmiter";
import { showRemoveTaskPopup } from "./popups/remove-task";

export class TaskListView extends EventEmitter {
    constructor() {
        super();

        this.addTaskHandlerVar = this.addTaskHandler.bind(this);
        this.showPopupHandlerVar = this.showPopupHandler.bind(this);
        this.closePopupHandlerVar = this.closePopupHandler.bind(this);
        this.changeTabHandlerVar = this.changeTabHandler.bind(this);
        this.addRemoveModeHandlerVar = this.addRemoveModeHandler.bind(this);
        this.selectAllHandlerVar = this.selectAllHandler.bind(this);
        this.deselectAllHandlerVar = this.deselectAllHandler.bind(this);
        this.checkItemsForRemoveVar = this.checkItemsForRemove.bind(this);

        this.renderTasksParent();
        this.findElements();
        this.addListeners();

        this.dailyArr = [];
        this.globalArr = [];
        this.removeItems = [];
        this.removeMode = false;
    }

    findElements() {
        this.taskListSection = document.querySelector('.section-tasklist');
        this.globalListSection = document.querySelector('.section-global-list');
        this.body = document.querySelector('body');
        this.addBtn = document.querySelector('.add-btn');
        this.editButtonCollection = document.querySelectorAll('.edit-btn');
        this.globalListTrigger = document.querySelector('.global-list__trigger');
        this.tabsContainer = document.querySelector('.page-tabs--main');
        this.header = document.querySelector('.header');
        this.removeTabsContainer = document.querySelector('.page-tabs--removed');
        this.trashCounter = document.querySelector('.trash-count');
    }

    addListeners() {
        document.addEventListener('click', this.addTaskHandlerVar);
        this.taskListSection.addEventListener('click', this.showPopupHandlerVar);
        this.taskListSection.addEventListener('click', this.closePopupHandlerVar);
        this.tabsContainer.addEventListener('click', this.changeTabHandlerVar);
        this.removeTabsContainer.addEventListener('click', this.changeTabHandlerVar);
        this.header.addEventListener('click', this.addRemoveModeHandlerVar);
        document.addEventListener('click', this.goToTimer.bind(this));

        /*REMOVE MODE*/

        document.addEventListener('click', this.checkItemsForRemoveVar);
        document.addEventListener('click', this.selectAllHandlerVar);
        document.addEventListener('click', this.deselectAllHandlerVar);
    }

    goToTimer(evt) {
        if (evt.target.closest('.tasks__status')) {
            const currentID = evt.target.closest('.tasks__item').id;
            evt.preventDefault();
            localStorage.setItem('currentID', currentID);
            location.href = "http://localhost:3000/timer";
        }
    }

    addTaskHandler(evt) {
        if (evt.target.classList.contains('add-btn')) {
            this.emit('showAddTaskPopup');
        }
    }

    showPopupHandler(evt) {
        if (evt.target.classList.contains('icon-edit') || evt.target.closest('.edit-btn')) {
            this.emit('showEditTaskPopup', evt);
        }
    }

    closePopupHandler(evt) {
        if (evt.target.parentNode.classList.contains('btn--close')) {
            document.querySelector('.section-popups').remove();
        }
    }

    changeTabHandler(evt) {
        if (evt.target.classList.contains('page-tabs__link') && evt.target.className === 'page-tabs__link') {
            evt.preventDefault();

            let currentTab = evt.target.closest('.page-tabs__content');
            const todoTab = document.querySelector('.page-tabs__content--todo');
            const doneTab = document.querySelector('.page-tabs__content--done');

            if (currentTab === todoTab) {
                todoTab.classList.remove('page-tabs__content--active');
                doneTab.classList.add('page-tabs__content--active');
            } else if (currentTab === doneTab) {
                todoTab.classList.add('page-tabs__content--active');
                doneTab.classList.remove('page-tabs__content--active');
            }
        }
    }

    renderTasksParent() {
        const rootWrapper = document.querySelector("#root .wrapper");

        while (rootWrapper.children.length) {
            rootWrapper.lastChild.remove();
        }

        rootWrapper.insertAdjacentHTML("afterbegin", taskList());
    }

    addRemoveModeHandler(evt) {

        if (evt.target.classList.contains('icon-trash') && this.trashCounter.textContent === '0') {

            this.removeMode = !this.removeMode;

            this.trashCount = evt.target.closest('.menu__link--remove').querySelector('.trash-count');

            if (this.removeMode) {
                this.body.classList.add('remove-mode');
            } else {
                this.body.classList.remove('remove-mode');
            }

        } else {
            showRemoveTaskPopup(this.removeItems);
            setTimeout(() => {
                document.querySelector('.buttons__btn--remove-tasks').addEventListener('click', () => {
                    this.removeItems = [];
                    this.trashCount.textContent = '0';
                });
            }, 0);

        }
    }

    selectAllHandler(evt) {
        if (evt.target.classList.contains('select-all-daily') || evt.target.classList.contains('select-all-global')) {

            let items;

            if (evt.target.closest('.page-tabs__content')) {
                items = evt.target.closest('.page-tabs__content').querySelectorAll('.icon-trash');
            } else {
                items = evt.target.closest('.global-list__content').querySelectorAll('.icon-trash');
            }

            items.forEach((item) => {
                item.className = "icon icon-close";
                if (!this.removeItems.includes(item.closest('li').id)) {
                    this.removeItems.push(item.closest('li').id);
                }
            });
            this.trashCounter.textContent = this.removeItems.length;

        }
    }

    deselectAllHandler(evt) {
        if (evt.target.classList.contains('deselect-all-daily') || evt.target.classList.contains('deselect-all-global')) {

            if (evt.target.classList.contains('deselect-all-daily')) {
                let items = evt.target.closest('.page-tabs__content').querySelectorAll('.icon-close');

                items.forEach((item) => {
                    this.dailyArr.push(item.closest('li').id);
                    item.className = "icon icon-trash";
                });

                this.removeItems = this.removeItems.filter((item) => {
                    if (!this.dailyArr.includes(item)) {
                        return item;
                    }
                });
            }

            if (evt.target.classList.contains('deselect-all-global')) {
                let items = evt.target.closest('.global-list__content').querySelectorAll('.icon-close');
                items.forEach((item) => {
                    this.globalArr.push(item.closest('li').id);
                    item.className = "icon icon-trash";
                });

                this.removeItems = this.removeItems.filter((item) => {
                    if (!this.globalArr.includes(item)) {
                        return item;
                    }
                });
            }

            this.trashCounter.textContent = this.removeItems.length;
        }
    }

    checkItemsForRemove(evt) {
        if (evt.target.classList.contains('tasks__target')) {

            if (evt.target.closest('.tasks__remove').querySelector('.icon').className === "icon icon-trash") {
                evt.target.closest('.tasks__remove').querySelector('.icon').className = "icon icon-close";
                if (!this.removeItems.includes(evt.target.closest('li').id)) {
                    this.removeItems.push(evt.target.closest('li').id);
                }
                this.trashCounter.textContent = this.removeItems.length;
                return;
            }

            if (evt.target.closest('.tasks__remove').querySelector('.icon').className === "icon icon-close") {
                evt.target.closest('.tasks__remove').querySelector('.icon').className = "icon icon-trash";

                this.removeItems = this.removeItems.filter((item) => {
                    if (item !== evt.target.closest('li').id) {
                        return item;
                    }
                });

                this.trashCounter.textContent = this.removeItems.length;
            }
        }
    }
}