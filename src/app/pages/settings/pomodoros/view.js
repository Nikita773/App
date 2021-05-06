import { EventEmitter } from "../../../helpers/event-emmiter";
import * as createPomodoroTab from "./pomodoros.hbs";

export class SettingsView extends EventEmitter {
    constructor() {
        super();
        this.renderDom();
        this.findElement();
        this.addListeners();
    }

    renderDom() {
        const rootWrapper = document.querySelector("#root .wrapper");
        while (rootWrapper.children.length) {
            rootWrapper.lastChild.remove();
        }
        rootWrapper.insertAdjacentHTML("afterbegin", createPomodoroTab());
    }

    findElement() {
        this.inputWorkTime = document.querySelector('.settings__value--work-time');
        this.inputIterations = document.querySelector('.settings__value--iterations');
        this.inputShortBreak = document.querySelector('.settings__value--sbreak');
        this.inputLongBreak = document.querySelector('.settings__value--lbreak');
        this.counters = document.querySelectorAll('.settings__counter');
        this.saveBtn = document.querySelector('.buttons__btn--save-settings');
    }

    addListeners() {
        for (let i = 0; i < this.counters.length; i++) {
            this.counters[i].addEventListener('click', this.changeNumberInState.bind(this));
        }
        this.saveBtn.addEventListener('click', () => {
            this.emit('Save settings');
        });
    }

    changeNumberInState(evt) {
        this.currentCounter = evt.target.closest('div');
        const minusBtn = this.currentCounter.querySelector('.settings__btn--minus');
        const plusBtn = this.currentCounter.querySelector('.settings__btn--plus');
        const closestBtn = evt.target.closest('button');

        if (closestBtn === minusBtn) {
            this.emit('inputWasChanged', { id: this.currentCounter.id, event: "minus" });
        }
        if (closestBtn === plusBtn) {
            this.emit('inputWasChanged', { id: this.currentCounter.id, event: "plus" });
        }
    }

    renderNumberInDom(state) {
        this.inputWorkTime.value = state.work_time;
        this.inputIterations.value = state.work_iterations;
        this.inputShortBreak.value = state.short_break;
        this.inputLongBreak.value = state.long_break;
    }

    addActiveClass(targetElement) {
        let activeCounter = document.querySelector('.settings__counter--active');
        if (activeCounter) {
            activeCounter.classList.remove('settings__counter--active');
        }
        targetElement.classList.add('settings__counter--active');
    }
}