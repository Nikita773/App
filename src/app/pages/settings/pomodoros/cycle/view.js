import { EventEmitter } from "../../../../helpers/event-emmiter";
import { getTimeFromMins } from "../../../../helpers/helpers";

export class CycleView extends EventEmitter {
    constructor() {
        super();
        this.findElements();
    }

    findElements() {
        this.cycleNode = document.querySelector('.cycle__container');
    }

    addCycle(state) {

        const cycleFragment = document.createDocumentFragment();
        const cycleBar = document.querySelector('.cycle__bar');
        let flag = true;
        let i, j;

        for (i = 0; i < 2; i++) {

            for (j = 0; j < state.iterations; j++) {
                const shortBreakBar = document.createElement('div');
                const workTimeBar = document.createElement('div');

                workTimeBar.classList.add('cycle__item', 'cycle__item--work');
                workTimeBar.style.width = state.workTimeBarWidth + '%';

                cycleFragment.append(workTimeBar);

                if (j !== state.iterations - 1) {
                    shortBreakBar.classList.add('cycle__item', 'cycle__item--short-break');
                    shortBreakBar.style.width = state.shortBreakBarWidth + '%';

                    cycleFragment.append(shortBreakBar);
                }
            }
            if (flag) {
                const longBreakBar = document.createElement('div');
                longBreakBar.classList.add('cycle__item', 'cycle__item--long-break');
                longBreakBar.style.width = state.longBreakBarWidth + '%';
                cycleFragment.append(longBreakBar);
                flag = false;
            }

        }
        cycleBar.append(cycleFragment);

    }

    addTimeLine(state) {

        const timeLine = document.querySelector('.cycle__timeline');
        let currentTime = state.timePeriod;

        const timeItems = document.createDocumentFragment();

        for (let i = 0; i < state.timeLineIterations; i++) {
            const cycleTime = document.createElement('div');
            const cyclePoint = document.createElement('span');
            const cycleDot = document.createElement('span');
            const cycleText = document.createElement('p');

            cycleTime.classList.add('cycle__time');
            cycleDot.classList.add('cycle__dot');
            cycleText.classList.add('cycle__text');
            cyclePoint.classList.add('cycle__point');

            cycleTime.style.width = state.timeBlockWidth + '%';
            cycleText.textContent = getTimeFromMins(currentTime);

            cyclePoint.append(cycleDot);
            cyclePoint.append(cycleText);
            cycleTime.append(cyclePoint);
            timeItems.append(cycleTime);

            currentTime += state.timePeriod;
        }

        timeLine.innerHTML = '';
        timeLine.append(timeItems);
    }

    addTimePeriod(state) {
        const endPoint = document.querySelector('.cycle__text--end');
        endPoint.textContent = getTimeFromMins(state.allIterationsTime);
    }

    addFirstCycleLabel(state) {
        const longBreakBar = document.querySelector('.cycle__item--long-break');

        const firstCycleTimeBar = document.querySelector('.cycle__point--first-cycle-time');
        const timeLabel = firstCycleTimeBar.querySelector('.cycle__text');
        const coords = longBreakBar.getBoundingClientRect();
        const firstCycleTime = getTimeFromMins(state.firstCycle);

        firstCycleTimeBar.style.left = longBreakBar.offsetLeft + coords.width + "px";
        timeLabel.textContent = "First cycle: " + firstCycleTime;
    }

    renderCycle(state) {
        while (this.cycleNode.children.length) {
            this.cycleNode.lastChild.remove();
        }
        this.cycleNode.insertAdjacentHTML('beforeend', `
        <div class="cycle__period">
                                    <span class="cycle__point">
                                    <p class="cycle__text cycle__text--begin">0m</p>
                                <span class="cycle__dot"></span>
                                    </span>
                                    <span class="cycle__point cycle__point--first-cycle-time">
                                    <p class="cycle__text cycle__text"></p>
                                <span class="cycle__dot"></span>
                                    </span>
                                    <span class="cycle__point">
                                    <p class="cycle__text cycle__text--end"></p>
                                <span class="cycle__dot"></span>
                                    </span>
                                </div>
                                <div class="cycle__bar"></div>
                                <div class="cycle__timeline"></div>
        `);
        this.addCycle(state);
        this.addTimeLine(state);
        this.addTimePeriod(state);
        this.addFirstCycleLabel(state);
    }
}