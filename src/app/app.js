import { Router } from './Router';
import { InitTasks } from './pages/task-list/task-list';
import { Timer } from './pages/timer/timer';
import { Reports } from './pages/reports/reports';
import { FirstTimePage } from './components/first-time-page/first-time';
import { InitSettings } from './pages/settings/settings';
import { InitCategories } from './pages/settings/categories/categories';
import { linkManage } from './components/header/sticky-header/sticky-header';

import $ from 'jquery';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

/* root component starts here */
require('assets/less/main.less'); // include general styles

/* example of including header component */
require('./components/header/header');
require('./pages/settings/settings');

const router = new Router();
router.get('/task-list', function(req) {
    new InitTasks('common');
    linkManage();
});
router.get('/settings/pomodoros', function(req) {
    new InitSettings();
    linkManage();
});
router.get('/settings/categories', function(req) {
    new InitCategories();
    linkManage();
});
router.get('/reports', function(req) {
    new Reports('tasks');
    linkManage();
});

router.get('/reports/day/pomodoros', function(req) {
    new Reports({ type: 'pomodoros', period: 'day' });
    linkManage();
});
router.get('/reports/week/pomodoros', function(req) {
    new Reports({ type: 'pomodoros', period: 'week' });
    linkManage();
});
router.get('/reports/month/pomodoros', function(req) {
    new Reports({ type: 'pomodoros', period: 'month' });
    linkManage();
});

router.get('/reports/day/tasks', function(req) {
    new Reports({ type: 'tasks', period: 'day' });
    linkManage();
});
router.get('/reports/week/tasks', function(req) {
    new Reports({ type: 'tasks', period: 'week' });
    linkManage();
});
router.get('/reports/month/tasks', function(req) {
    new Reports({ type: 'tasks', period: 'month' });
    linkManage();
});


router.get('/timer', function(req) {
    new Timer();
    linkManage();
});

router.get('/', function() {
    if (sessionStorage.isNewUser) {
        new InitTasks('common');
        linkManage();
    } else {
        sessionStorage.setItem('isNewUser', true);
        new FirstTimePage();
        linkManage();
    }
});

router.init();

$(function() {
    $(document).tooltip({
        track: true,
        position: {
            my: "left-10 bottom+70",
            using: function(position, feedback) {
                $(this).css(position);
            },
        },
    });
});