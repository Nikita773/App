import * as globalMainTab from "./global-main.hbs";
import * as categoryItemsMain from "./category-block-main.hbs";
import { EventEmitter } from "../../../../helpers/event-emmiter";


export class GlobalView extends EventEmitter {
    constructor(mode) {
        super();

        this.filterHandlerVar = this.filterHandler.bind(this);
        this.toggleHandlerVar = this.toggleHandler.bind(this);
        this.addToDailyTaskVar = this.addToDailyTaskHandler.bind(this);
        this.showPopupHandlerVar = this.showPopupHandler.bind(this);

        this.mode = mode;
    }

    showPopupHandler(evt) {
        if (evt.target.classList.contains('icon-edit') || evt.target.closest('.edit-btn')) {
            this.emit('showEditTaskPopup', evt);
        }
    }

    addToDailyTaskHandler(evt) {
        $('.ui-tooltip').remove();
        if (evt.target.closest('.add-to-daily-btn')) {
            this.emit('Add to daily', evt);
        }
    }

    filterHandler(evt) {
        if (evt.target.closest('.filter') && evt.target.classList.contains('page-tabs__link')) {
            evt.preventDefault();
            evt.target.closest('.filter').querySelector('.page-tabs__link--active').classList.remove('page-tabs__link--active');
            evt.target.classList.add('page-tabs__link--active');


            this.emit('Filter categories', evt.target.textContent.toLowerCase());
        }
    }

    toggleHandler(evt) {
        if (evt.target.classList.contains('global-list__trigger')) {
            evt.preventDefault();
            const globalListTrigger = document.querySelector('.global-list__trigger');
            const globalList = document.querySelector('.section-global-list');

            if (globalList.classList.contains('disabled')) {
                globalList.classList.remove('disabled');

                document.querySelector('.icon-global-list-arrow-right').remove();
                globalListTrigger.insertAdjacentHTML('beforeend', `
                    <span class="icon icon-global-list-arrow-down"></span>
                    `);

            } else {
                globalList.classList.add('disabled');

                document.querySelector('.icon-global-list-arrow-down').remove();
                globalListTrigger.insertAdjacentHTML('beforeend', `
                    <span class="icon icon-global-list-arrow-right"></span>
                    `);
            }
        }
    }

    renderGlobalList(state) {
        if (!document.querySelector('.section-global-list')) {
            const root = document.querySelector('.wrapper');

            if (this.mode === 'common') {
                root.insertAdjacentHTML('beforeend', globalMainTab());
                const filter = document.querySelector('.filter');
                filter.addEventListener('click', this.filterHandlerVar, false);
            }

            this.renderCategories(state);
            this.globalListSection = document.querySelector('.section-global-list');

        } else {
            this.renderCategories(state);
        }

        this.emit('Global list rendered');
    }

    renderCategories(state) {

        if (state) {
            const root = document.querySelector('.section-global-list .page-tabs__content');
            const globalListMain = document.querySelector('.global-list__content--main');
            const filter = document.querySelector('.filter');

            filter.removeEventListener('click', this.filterHandlerVar);
            filter.addEventListener('click', this.filterHandlerVar, false);

            while (root.children.length) {
                root.lastChild.remove();
            }

            if (globalListMain) {
                for (let key in state) {
                    if (state[key].length > 0) {
                        root.insertAdjacentHTML('beforeend', categoryItemsMain(state[key]));
                        const currentElem = root.querySelector(`.tasks--${key}-category`);

                        currentElem.addEventListener('click', this.addToDailyTaskVar, false);
                        currentElem.addEventListener('click', this.showPopupHandlerVar, false);
                    }
                }
            }
        }

        if (!Object.keys(state).length) {
            document.querySelector('.filter').classList.add('disabled');
        } else {
            document.querySelector('.filter').classList.remove('disabled');
        }
    }
}