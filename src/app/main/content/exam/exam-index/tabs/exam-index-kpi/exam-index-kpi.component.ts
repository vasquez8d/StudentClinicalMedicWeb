import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { ExamIndexKpiService } from './exam-index-kpi.service';

@Component({
    selector: 'fuse-exam-index-kpi',
    templateUrl: './exam-index-kpi.component.html',
    styleUrls: ['./exam-index-kpi.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ExamIndexKpiComponent {
    widgets: any;
    widget1SelectedYear = '2016';
    widget5SelectedDay = 'today';
    categoryKpi: any = 1;
    categoryExam: any = [
        {
            text: 'ENAM',
            value: 1
        },
        {
            text: 'EsSalud',
            value: 2
        },
        {
            text: 'Salud pública',
            value: 13            
        },
        {
            text: 'Ciencias básicas',
            value: 10
        },
        {
            text: 'Ginecología',
            value: 15
        },
        {
            text: 'Pediatría',
            value: 16
        },
        {
            text: 'Cirugía',
            value: 17
        },
        {
            text: 'Medicina general',
            value: 18
        }
    ];

    constructor(
        private analyticsDashboardService: ExamIndexKpiService
    ) {
        // Get the widgets from the service
        this.widgets = this.analyticsDashboardService.widgets;
        console.log(this.widgets);
        // Register the custom chart.js plugin
        this.registerCustomChartJSPlugin();
    }

    /**
     * Register a custom plugin
     */

    changeCategoryKpi(value){
        console.log(value);
    }

    registerCustomChartJSPlugin() {
        (<any>window).Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing) {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                ) {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i) {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }
}

