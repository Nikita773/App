import { EventEmitter } from "../../../../helpers/event-emmiter";
import $ from 'jquery';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

require('../../../../components/notification/notification');

export class AddTaskView extends EventEmitter {
    constructor() {
        super();

        this.addTaskToDbVar = this.addTaskToDb.bind(this);
    }

    renderAddTaskPopup() {
        const root = document.querySelector('body');
        root.insertAdjacentHTML('beforeend', `
        <section class="section-popups">
        <div class="overlay">
        <div class="popup popup--add-task">
                    <div class="popup__controls"><button class="btn btn--close"><span class="icon-close"></span></button><button class="btn btn--apply btn--apply-add"><span class="icon-check"></span></button></div>
                    <div class="popup__title">
                        <h1>Add task</h1>
                    </div>
                    <form class="popup__form">
                        <div class="popup__item">
                            <p class="caption">Title</p>
                            <input id="task_title" type="text" placeholder="Add title here"></div>
                        <div class="popup__item">
                            <p class="caption">Description</p>
                            <input id="task_description" type="text" placeholder="Add description here">
                        </div>
                        <div class="popup__item popup__item--bordered">
                            <p class="caption">Category</p>
                            <div id="task_category">
                            <input type="radio" id="work" value="work" name="category" checked/>
                            <label class="radio-label radio-label--work" for="work">Work</label>
                            <input type="radio" id="education" value="education" name="category">
                            <label class="radio-label radio-label--education" for="education">Education</label>
                            <input type="radio" id="hobby" value="hobby" name="category">
                            <label class="radio-label radio-label--hobby" for="hobby">Hobby</label>
                            <input type="radio" id="sport" value="sport" name="category">
                            <label class="radio-label radio-label--sport" for="sport">Sport</label>
                            <input type="radio" id="other" value="other" name="category">
                            <label class="radio-label radio-label--other" for="other">Other</label>
                            </div>
                        </div>
                        <div class="popup__item">
                            <p class="caption">Deadline</p>
                            <input id="task_deadline" class="date-picker">
                        </div>
                        <div class="popup__item popup__item--bordered">
                            <p class="caption">Estimation</p>
                            <div id="task_estimation" class="pomidoros">
                                <input class="pomidoro pomidoro-1" value="5" id="estimation-1" type="radio" name="estimation" />
                                <label class="pomidoro pomidoro-1" for="estimation-1"></label>
                                <input class="pomidoro pomidoro-2" value="4" id="estimation-2" type="radio" name="estimation" />
                                <label class="pomidoro pomidoro-2" for="estimation-2"></label>
                                <input class="pomidoro pomidoro-3" value="3" id="estimation-3" type="radio" name="estimation" />
                                <label class="pomidoro pomidoro-3" for="estimation-3"></label>
                                <input class="pomidoro pomidoro-4" value="2" id="estimation-4" type="radio" name="estimation" />
                                <label class="pomidoro pomidoro-4" for="estimation-4"></label>
                                <input class="pomidoro pomidoro-5" value="1" id="estimation-5" type="radio" name="estimation" />
                                <label class="pomidoro pomidoro-5" for="estimation-5"></label>
                            </div>
                        </div>
                        <div class="popup__item popup__item--bordered">
                            <p class="caption">Priority</p>
                            <div id="task_priority">
                            <input type="radio" id="urgent" value="urgent" name="priority" checked/>
                            <label class="radio-label radio-label--urgent" for="urgent">Urgent</label>
                            <input type="radio" id="high" value="high" name="priority">
                            <label class="radio-label radio-label--high" for="high">High</label>
                            <input type="radio" id="middle" value="middle" name="priority">
                            <label class="radio-label radio-label--middle" for="middle">Middle</label>
                            <input type="radio" id="low" value="low" name="priority">
                            <label class="radio-label radio-label--low" for="low">Low</label>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
        </section>
        `);

        this.createDatepicker();

        const popup = document.querySelector('.section-popups');
        popup.addEventListener('click', this.closeAddTaskPopup.bind(this));
        popup.addEventListener('click', this.addTaskToDbVar.bind(this));
    }

    createDatepicker() {
        const input = $('#task_deadline');
        input.datepicker({
            dateFormat: 'M dd, yy',
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
        });
        input.datepicker('setDate', new Date(input.val()));
    }

    closeAddTaskPopup(evt) {
        if (evt.target.parentNode.classList.contains('btn--close')) {
            document.querySelector('.section-popups').remove();
        }
    }

    addTaskToDb(evt) {
        if (evt.target.closest('.btn--apply-add')) {

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

            const category = document.querySelector('input[name=category]:checked').value;
            const deadline = $("#task_deadline").datepicker("getDate");
            let estimation = document.querySelector('input[name=estimation]:checked');
            if (estimation) {
                estimation = estimation.value;
            } else {
                $().notification({ type: 'error', text: 'Estimation option is required!', showTime: 5000 });
                return;
            }
            const priority = document.querySelector('input[name=priority]:checked').value;



            const taskObject = {
                category,
                completeDate: "",
                deadline,
                description,
                estimation: +estimation,
                failed: 0,
                isDaily: false,
                isDone: false,
                isOverdue: false,
                isRemove: false,
                priority,
                title,
                doneHolder: 'global'
            };
            this.emit('Add task', taskObject);
            document.querySelector('.section-popups').remove();
        }
    }
}