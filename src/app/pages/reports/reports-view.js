import reportsTasks from "./reports-tasks.hbs";
import reportsPomodoros from "./reports-pomodoros.hbs";
import { renderHighcharts } from "../../components/highcharts/highcharts";


export class ReportsView {
    constructor(status) {
        this.status = status;
        this.renderReports(status);
        this.renderHighcharts = renderHighcharts;
    }

    changeActiveTab(period, tabLinks) {
        const currentActiveLink = tabLinks.querySelector('.page-tabs__link--active');
        currentActiveLink.classList.remove('page-tabs__link--active');

        tabLinks.querySelector(`a[data-link="${period}"]`).classList.add('page-tabs__link--active');
    }

    renderReports(status) {
        const rootWrapper = document.querySelector("#root .wrapper");

        while (rootWrapper.children.length) {
            rootWrapper.lastChild.remove();
        }

        if (status.type === 'pomodoros') {
            rootWrapper.insertAdjacentHTML("beforeend", reportsPomodoros());
        } else if (status.type === 'tasks') {
            rootWrapper.insertAdjacentHTML("beforeend", reportsTasks());
        }

        const tabLinks = document.querySelector('.page-tabs__links');

        this.changeActiveTab(status.period, tabLinks);
    }

    renderTasksData = (data) => {
        console.log(data, this.status);
        this.renderHighcharts(data, this.status);
    };

    renderPomodorosData = (data) => {
        this.renderHighcharts(data, this.status);
    };
}