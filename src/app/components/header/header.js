import * as createHeader from "./header.hbs";
import { addStickyHeader } from "./sticky-header/sticky-header";

const root = document.querySelector("#root");
root.insertAdjacentHTML("afterbegin", createHeader());

const header = document.querySelector('header');
const menuLinks = [...header.querySelectorAll('.menu__link')];

if (window.location.href === 'http://localhost:3000/task-list') {
    document.querySelector('.menu__link--tasks').classList.add('menu__link--active');
}
if (window.location.href === 'http://localhost:3000/reports' ||
    window.location.href === 'http://localhost:3000/reports/day/pomodoros' ||
    window.location.href === 'http://localhost:3000/reports/week/pomodoros' ||
    window.location.href === 'http://localhost:3000/reports/month/pomodoros' ||
    window.location.href === 'http://localhost:3000/reports/day/tasks' ||
    window.location.href === 'http://localhost:3000/reports/week/tasks' ||
    window.location.href === 'http://localhost:3000/reports/month/tasks') {
    document.querySelector('.menu__link--reports').classList.add('menu__link--active');
}
if (window.location.href === 'http://localhost:3000/settings' ||
    window.location.href === 'http://localhost:3000/settings/pomodoros' ||
    window.location.href === 'http://localhost:3000/settings/categories') {
    document.querySelector('.menu__link--settings').classList.add('menu__link--active');
}

if (window.location.href === 'http://localhost:3000/task-list' ||
    window.location.href === 'http://localhost:3000/') {
    document.querySelector('.menu__link--remove').closest('li').classList.remove('disabled');
} else {
    document.querySelector('.menu__link--remove').closest('li').classList.add('disabled');
}
addStickyHeader();