const Highcharts = require('highcharts');

export class HighchartsView {
    constructor() {}
    renderHighcharts(data) {

        this.series = data.series;
        this.period = data.period;
        this.type = data.type;

        if (this.period === 'day') {

            this.categories = ['urgent', ' high', 'middle', 'low', 'failed'];

        } else if (this.period === 'week') {

            this.categories = [];
            for (let i = 0; i < 7; i++) {
                let date = new Date();
                date.setDate(date.getDate() - i);
                date = date.toString().slice(0, 3);
                this.categories.push(date);
            }
            this.categories.reverse();

        } else if (this.period === 'month') {

            this.categories = [];
            for (let i = 1; i < 31; i++) {
                this.categories.push(i);
            }

        }

        Highcharts.chart('reports', {
            chart: {
                type: 'column',
                backgroundColor: '#253d4f'
            },

            title: {
                text: '',
                style: {
                    color: "#fff"
                }
            },

            xAxis: {
                categories: this.categories,
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                endOnTick: false,
                labels: {
                    style: {
                        color: '#fff'
                    }
                },
                title: {
                    text: ''
                }
            },

            tooltip: {
                formatter: function() {
                    return `<b>${this.series.name}</b><br/>${data.type[0].toUpperCase() + data.type.slice(1)}: ${this.y}`;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 0
                }
            },

            series: this.series,
            legend: {
                symbolHeight: 10,
                symbolWidth: 10,
                symbolRadius: 0,
                margin: 35,
                itemStyle: {
                    font: 'normal 300 11px "Roboto"',
                    color: "#88a3b5"
                }
            },
        });
    }
}