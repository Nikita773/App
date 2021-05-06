import * as timerMainTemplate from "./root-template.hbs";
import * as timerFirstPage from "./timer-first-page/timer-first-page.hbs";
import * as timerProcess from "./timer-process/timer-process.hbs";
import * as timerBreak from "./timer-break/timer-break.hbs";
import * as timerFailed from "./timer-failed/timer-failed.hbs";
import * as timerCompleted from "./timer-completed/timer-completed.hbs";
import { EventEmitter } from "../../helpers/event-emmiter";
require('../../components/radial-timer/radial-timer');

export class TimerView extends EventEmitter {
    constructor() {
        super();
        this.pomodoros = 0;
        this.round = 0;
        this.pomodoroStatus = [];
        this.failed = 0;
        this.success = 0;

        this.firstRenderTimer = true;

    }

    renderFirstPageTimer(item) {

        if (!localStorage.getItem('currentID')) {
            return;
        }
        this.item = item;
        this.pomodoros = +item.estimation;
        this.iterations = item.work_iterations;

        const rootWrapper = document.querySelector("#root .wrapper");

        while (rootWrapper.children.length) {
            rootWrapper.lastChild.remove();
        }

        rootWrapper.insertAdjacentHTML("afterbegin", timerMainTemplate(item));

        this.timerSection = document.querySelector('.section-timer');
        this.timerSection.classList.add(`section-timer--${item.category}`);

        this.rootForTimer = document.querySelector('.timer-container');
        this.rootForTimer.insertAdjacentHTML("afterbegin", timerFirstPage(item));

        this.startProcessBtn = document.querySelector('.buttons__btn--start-process');
        this.startProcessBtn.addEventListener('click', this.renderProcessPageTimer.bind(this));

        this.addPomodoroBtn = document.querySelector('.estimation__add-btn');
        this.addPomodoroBtn.addEventListener('click', this.addAditionalPomodoro.bind(this));

        this.header = document.querySelector('.header');
        this.navigation = document.querySelector('.navigation');
    }

    renderProcessPageTimer() {

        if (!this.firstRenderTimer) {
            $.fn.radialTimer.stop();
        }
        this.firstRenderTimer = false;


        if (!this.header.classList.contains('invisible') &&
            !this.navigation.classList.contains('invisible')) {
            this.header.classList.add('invisible');
            this.navigation.classList.add('invisible');
        }

        this.round++;

        if (this.pomodoros < 10) {
            this.addPomodoroBtn.classList.add('disabled');
        }

        const item = this.item;

        while (this.rootForTimer.children.length) {
            this.rootForTimer.lastChild.remove();
        }

        this.rootForTimer.insertAdjacentHTML("afterbegin", timerProcess(item));

        this.failPomodoroBtn = document.querySelector('.buttons__btn--fail-pomodoro');
        this.finishPomodoroBtn = document.querySelector('.buttons__btn--finish-pomodoro');

        if (this.round < this.pomodoros) {
            this.failPomodoroBtn.addEventListener('click', this.renderFailPageTimer.bind(this));
            this.finishPomodoroBtn.addEventListener('click', this.renderSuccessPageTimer.bind(this));
        } else {
            this.failPomodoroBtn.addEventListener('click', this.renderCompletePage.bind(this, 'fail'));
            this.finishPomodoroBtn.addEventListener('click', this.renderCompletePage.bind(this, 'success'));
        }

        const time = this.item.work_time;
        const content = `<span class="time__number">${time}</span><span class="time__label">min</span>`;
        const onTimeout = () => {
            this.finishPomodoroBtn.click();
        };

        const dataObj = { time, content, onTimeout };

        $().radialTimer(dataObj);
    }

    renderFailPageTimer() {
        $().radialTimer.stop();

        if (this.pomodoros < 10) {
            this.addPomodoroBtn.classList.remove('disabled');
        }

        this.failed += 1;
        this.pomodoroStatus.push('fail');

        while (this.rootForTimer.children.length) {
            this.rootForTimer.lastChild.remove();
        }

        this.rootForTimer.insertAdjacentHTML("afterbegin", timerFailed());

        this.round % this.iterations === 0 ?
            this.break = this.item.long_break :
            this.break = this.item.short_break;

        this.startFromFailedBtn = document.querySelector('.buttons__btn--start-from-failed');
        this.startFromFailedBtn.addEventListener('click', this.renderProcessPageTimer.bind(this));

        this.changePomodoroState();

        const time = this.break;
        const content = `<span class="time__label">Break</span><span class="time__number">${time}</span><span class="time__label">min</span>`;
        const onTimeout = () => {
            const timeBlock = document.querySelector('.time');
            timeBlock.classList.add('time--message');
            timeBlock.innerHTML = `Break<br>is over!`;
        };
        const dataObj = { time, content, onTimeout };
        $().radialTimer(dataObj);
    }

    renderSuccessPageTimer() {
        $().radialTimer.stop();

        if (this.pomodoros < 10) {
            this.addPomodoroBtn.classList.remove('disabled');
        }

        this.success += 1;
        this.pomodoroStatus.push('success');

        $().notification({ type: 'info', text: 'You finished pomodoro!', showTime: 5000 });

        while (this.rootForTimer.children.length) {
            this.rootForTimer.lastChild.remove();
        }

        this.rootForTimer.insertAdjacentHTML("afterbegin", timerBreak());

        this.round % this.iterations === 0 ?
            this.break = this.item.long_break :
            this.break = this.item.short_break;

        this.startFromSuccessBtn = document.querySelector('.buttons__btn--start-from-success');
        this.completeTaskBtn = document.querySelector('.buttons__btn--complete-task');

        this.startFromSuccessBtn.addEventListener('click', this.renderProcessPageTimer.bind(this));
        this.completeTaskBtn.addEventListener('click', this.completeTask.bind(this));

        this.changePomodoroState();

        const time = this.break;
        const content = `<span class="time__label">Break</span><span class="time__number">${time}</span><span class="time__label">min</span>`;
        const onTimeout = () => {
            const timeBlock = document.querySelector('.time');
            timeBlock.classList.add('time--message');
            timeBlock.innerHTML = `Break<br>is over!`;
        };
        const dataObj = { time, content, onTimeout };
        $().radialTimer(dataObj);
    }

    completeTask() {
        $().radialTimer.stop();

        this.addPomodoroBtn.classList.add('disabled');

        this.emit('Send done task to db', {
            failed: this.failed,
            estimation: this.round,
            completeDate: new Date().toISOString().slice(0, 10),
            isDone: true,
            isDaily: false,
            id: this.item.id
        });

        this.header.classList.remove('invisible');
        this.navigation.classList.remove('invisible');

        while (this.rootForTimer.children.length) {
            this.rootForTimer.lastChild.remove();
        }
        this.rootForTimer.insertAdjacentHTML("afterbegin", timerCompleted());

        this.timerSection.classList.add('completed');

        localStorage.removeItem('currentID');
    }

    changePomodoroState() {
        const pomodoros = document.querySelectorAll('.estimation-icon');

        pomodoros.forEach((item, index) => {
            if (this.pomodoroStatus[index] === 'fail') {
                item.classList.add('failed');
            }
            if (this.pomodoroStatus[index] === 'success') {
                item.classList.add('checked');
            }
        });
    }

    addAditionalPomodoro() {
        const rootForEstimation = document.querySelector('.estimation__icons');

        if (this.pomodoros < 10) {
            this.pomodoros += 1;
            this.item.estimation += 1;
            rootForEstimation.insertAdjacentHTML('beforeend', `<span class="estimation-icon"></span>`);
        }
        if (this.pomodoros === 10) {
            this.addPomodoroBtn.classList.add('disabled');
        }
    }

    renderCompletePage(state) {

        if (state === 'fail') {
            this.failed += 1;
        }
        this.header.classList.remove('invisible');
        this.navigation.classList.remove('invisible');

        this[state] += 1;
        this.pomodoroStatus.push(state);

        while (this.rootForTimer.children.length) {
            this.rootForTimer.lastChild.remove();
        }
        this.rootForTimer.insertAdjacentHTML("afterbegin", timerCompleted());

        this.changePomodoroState();

        if (this.pomodoros == this.round && this.round % +this.iterations === 0) {
            this.emit('Send done task to db', {
                failed: this.failed,
                estimation: this.pomodoros,
                completeDate: new Date().toISOString().slice(0, 10),
                isDone: true,
                isDaily: false,
                id: this.item.id,
                notification: 'Long break warning'
            });
        } else {
            this.emit('Send done task to db', {
                failed: this.failed,
                estimation: this.pomodoros,
                completeDate: new Date().toISOString().slice(0, 10),
                isDone: true,
                isDaily: false,
                id: this.item.id
            });
        }

        localStorage.removeItem('currentID');

        document.querySelector('.navigation__right').classList.remove('disabled');
    }
}