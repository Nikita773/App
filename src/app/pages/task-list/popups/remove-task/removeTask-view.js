import { EventEmitter } from "../../../../helpers/event-emmiter";

export class removeTaskView extends EventEmitter {
    constructor() {
        super();
        this.findElements();
    }

    findElements() {
        this.body = document.querySelector('body');
    }

    renderRemovePopup(tasks) {
        if (tasks.length) {

            this.body.insertAdjacentHTML('beforeend', `
            <section class="section-popups">
            <div class="overlay">
            <div class="popup popup--remove-task">
            <div class="popup__controls"><button class="btn btn--close-remove-popup"><span class="icon-close"></span></button></div>
            <div class="popup__title">
            <h1>Remove task</h1>
            </div>
            <div class="popup__message">
            <p class="message">Are you sure you want to remove selected task(s)?</p>
            </div>
            <div class="buttons">
            <button class="buttons__btn buttons__btn--solid buttons__btn--solid-dark-sky-blue buttons__btn--cancel">Cancel</button>
            <button class="buttons__btn buttons__btn--solid buttons__btn--solid-tomato buttons__btn--remove-tasks">Remove</button>
            </div>
            </div>
            </div>
            </section>
            `);

            const cancelBtn = document.querySelector('.buttons__btn--cancel');
            const removeTasksBtn = document.querySelector('.buttons__btn--remove-tasks');
            const closeBtn = document.querySelector('.btn--close-remove-popup');

            cancelBtn.addEventListener('click', (evt) => {
                document.querySelector('.section-popups').remove();
            });

            closeBtn.addEventListener('click', (evt) => {
                document.querySelector('.section-popups').remove();
            });

            removeTasksBtn.addEventListener('click', (evt) => {
                this.emit('Remove tasks from db', tasks);
                document.querySelector('.section-popups').remove();
                this.body.classList.remove('remove-mode');
            });
        }
    }
}