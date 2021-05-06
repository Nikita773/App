import { EventEmitter } from "../../../../helpers/event-emmiter";
import $ from 'jquery';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

export class EditTaskView extends EventEmitter {
    constructor() {
        super();

        this.addToDailyTaskVar = this.addToDailyTask.bind(this);
        this.editTaskVar = this.editTask.bind(this);
        this.removeTaskVar = this.removeTask.bind(this);
        this.closeEditTaskPopupVar = this.closeEditTaskPopup.bind(this);

        this.findElements();
        this.addListeners();
    }

    findElements() {
        this.root = document.querySelector('.wrapper');
    }

    addListeners() {

    }

    renderEditTaskPopup(data) {
        const state = data.state;
        const evt = data.evt;

        this.currentID = evt.target.closest('li').id;
        let currentTask;

        if (state.length > 1) {
            state.find((item) => {
                if (String(item.id) === this.currentID) {
                    currentTask = item;
                }
            });
        } else {
            currentTask = state[0];
        }

        const root = document.querySelector('body');
        root.insertAdjacentHTML('beforeend', `
        <section class="section-popups">
        <div class="overlay">
        <div id="popup-${this.currentID}" class="popup popup--edit-task">
                    <div class="popup__controls">
                        <div class="left-col">
                            <button class="btn btn--remove btn--remove-edit"><span class="icon-trash"></span></button>
                        </div>
                        <div class="right-col">
                            <button class="btn btn--close"><span class="icon-close"></span></button>
                            <button class="btn btn--apply btn--apply-edit"><span class="icon-check"></span></button>
                        </div>
                    </div>
                    <div class="popup__title">
                        <h1>Edit task</h1>
                    </div>
                    <div class="popup__form">
                        <div class="popup__item">
                            <p class="caption">Title</p>
                            <input type="text" id="task_title" value="${currentTask.title}" placeholder="Add title here"></div>
                        <div class="popup__item">
                            <p class="caption">Description</p>
                            <input type="text" id="task_description" value="${currentTask.description}" placeholder="Add description here">
                        </div>
                        <div class="popup__item popup__item--bordered">
                            <p class="caption">Category</p>
                            <input type="radio" id="work" name="category" checked/>
                            <label class="radio-label radio-label--work" for="work">Work</label>
                            <input type="radio" id="education" name="category">
                            <label class="radio-label radio-label--education" for="education">Education</label>
                            <input type="radio" id="hobby" name="category">
                            <label class="radio-label radio-label--hobby" for="hobby">Hobby</label>
                            <input type="radio" id="sport" name="category">
                            <label class="radio-label radio-label--sport" for="sport">Sport</label>
                            <input type="radio" id="other" name="category">
                            <label class="radio-label radio-label--other" for="other">Other</label>
                        </div>
                        <div class="popup__item">
                            <p class="caption">Deadline</p>
                            <input id="task_deadline" class="date-picker" value="${currentTask.deadline}">
                        </div>
                        <div class="popup__item popup__item--bordered">
                            <p class="caption">Estimation</p>
                            <div class="pomidoros">
                                <input class="pomidoro pomidoro-5" id="estimation-5" type="radio" name="estimation" value="5" />
                                <label class="pomidoro pomidoro-5" for="estimation-5"></label>
                                <input class="pomidoro pomidoro-4" id="estimation-4" type="radio" name="estimation" value="4" />
                                <label class="pomidoro pomidoro-4" for="estimation-4"></label>
                                <input class="pomidoro pomidoro-3" id="estimation-3" type="radio" name="estimation" value="3" />
                                <label class="pomidoro pomidoro-3" for="estimation-3"></label>
                                <input class="pomidoro pomidoro-2" id="estimation-2" type="radio" name="estimation" value="2" />
                                <label class="pomidoro pomidoro-2" for="estimation-2"></label>
                                <input class="pomidoro pomidoro-1" id="estimation-1" type="radio" name="estimation" value="1" />
                                <label class="pomidoro pomidoro-1" for="estimation-1"></label>
                            </div>
                        </div>
                        <div class="popup__item popup__item--bordered">
                            <p class="caption">Priority</p>
                            <input type="radio" id="urgent" name="priority" checked/>
                            <label class="radio-label radio-label--urgent" for="urgent">Urgent</label>
                            <input type="radio" id="high" name="priority">
                            <label class="radio-label radio-label--high" for="high">High</label>
                            <input type="radio" id="middle" name="priority">
                            <label class="radio-label radio-label--middle" for="middle">Middle</label>
                            <input type="radio" id="low" name="priority">
                            <label class="radio-label radio-label--low" for="low">Low</label>
                        </div>
                    </div>
                </div>
        </div>
        </section>
        `);

        this.createDatepicker();

        document.querySelector(`#${currentTask.category}`).setAttribute('checked', 'checked');
        document.querySelector(`#estimation-${currentTask.estimation}`).setAttribute('checked', 'checked');
        document.querySelector(`#${currentTask.priority}`).setAttribute('checked', 'checked');

        const popup = document.querySelector('.section-popups');

        popup.addEventListener('click', this.editTaskVar, false);
        popup.addEventListener('click', this.removeTaskVar, false);
        popup.addEventListener('click', this.closeEditTaskPopupVar, false);
    }

    createDatepicker() {
        const input = $('#task_deadline');
        input.datepicker({
            dateFormat: 'M dd, yy',
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
        });
        input.datepicker('setDate', new Date(input.val()));
    }

    editTask(evt) {
        if (evt.target.classList && evt.target.closest('.btn--apply-edit')) {
            const id = Number(document.querySelector('.popup').id.replace(/\D+/g, ""));
            const title = document.querySelector('#task_title').value;
            if (!title.trim()) {
                $().notification({ type: 'error', text: 'Title is required field!', showTime: 5000 });
                return;
            }
            const description = document.querySelector('#task_description').value;
            if (!description.trim()) {
                $().notification({ type: 'error', text: 'Description is required field!', showTime: 5000 });
                return;
            }
            const category = document.querySelector('input[name=category]:checked').id;
            const deadline = document.querySelector('#task_deadline').value;
            const estimation = document.querySelector('input[name=estimation]:checked').value;
            const priority = document.querySelector('input[name=priority]:checked').id;

            const taskObject = {
                id,
                category,
                deadline,
                description,
                estimation,
                priority,
                title
            };

            this.emit('Edit data', taskObject);
            document.querySelector('.section-popups').remove();
        }
    }

    removeTask(evt) {
        if (evt.target.classList && evt.target.closest('.btn--remove-edit')) {
            const id = Number(document.querySelector('.popup').id.replace(/\D+/g, ""));
            this.emit('Delete data', id);
            document.querySelector('.section-popups').remove();
        }
    }

    addToDailyTask(evt) {
        const dailyBlock = document.querySelector('.page-tabs--main .tasks--todo');
        const dailyTasks = dailyBlock.querySelectorAll('.tasks__item');

        if (dailyTasks.length < 5) {
            const taskObject = {
                id: evt.target.closest('li').id,
                isDaily: true,
                doneHolder: 'daily',
                notification: 'toDaily'
            };
            this.emit('Update data', taskObject);
        } else {
            $().notification({ type: 'error', text: 'You can add only 5 tasks to daily list!', showTime: 5000 });
        }
    }

    closeEditTaskPopup(evt) {
        if (evt.target.parentNode.classList.contains('btn--close')) {
            document.querySelector('.section-popups').remove();
        }
    }
}