import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from './project.service';
import { GlobalUser } from '../../../../../global/globaluser';
import { MomentModule } from 'angular2-moment';
import { AnalyticsDashboardService } from '../analytics/analytics.service';

@Component({
    selector     : 'fuse-project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseProjectDashboardComponent implements OnInit
{
    projects: any[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    // widgetsAna: any;

    user: any = {};

    dateNow = Date.now();
    constructor(private projectDashboardService: ProjectDashboardService,
                private analyticsDashboardService: AnalyticsDashboardService,
                private globalUser: GlobalUser,
                private momentModule: MomentModule
            )
    {
        this.projects = this.projectDashboardService.projects;
        this.selectedProject = this.projects[0];

        this.widgets = this.projectDashboardService.widgets;

        // this.widgetsAna = this.analyticsDashboardService.widgets;

        this.user = this.globalUser.user;
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange  : 'TW',
            xAxis         : true,
            yAxis         : true,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect      : (ev) => {
                console.log(ev);
            },
            supporting    : {
                currentRange  : '',
                xAxis         : false,
                yAxis         : false,
                gradient      : false,
                legend        : false,
                showXAxisLabel: false,
                xAxisLabel    : 'Days',
                showYAxisLabel: false,
                yAxisLabel    : 'Isues',
                scheme        : {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve         : shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);
        
        // this.registerCustomChartJSPlugin();
    }

    ngOnInit()
    {
        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);
    }

    // registerCustomChartJSPlugin() {
    //     (<any>window).Chart.plugins.register({
    //         afterDatasetsDraw: function (chart, easing) {
    //             // Only activate the plugin if it's made available
    //             // in the options
    //             if (
    //                 !chart.options.plugins.xLabelsOnTop ||
    //                 (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
    //             ) {
    //                 return;
    //             }

    //             // To only draw at the end of animation, check for easing === 1
    //             const ctx = chart.ctx;

    //             chart.data.datasets.forEach(function (dataset, i) {
    //                 const meta = chart.getDatasetMeta(i);
    //                 if (!meta.hidden) {
    //                     meta.data.forEach(function (element, index) {

    //                         // Draw the text in black, with the specified font
    //                         ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    //                         const fontSize = 13;
    //                         const fontStyle = 'normal';
    //                         const fontFamily = 'Roboto, Helvetica Neue, Arial';
    //                         ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

    //                         // Just naively convert to string for now
    //                         const dataString = dataset.data[index].toString() + 'k';

    //                         // Make sure alignment settings are correct
    //                         ctx.textAlign = 'center';
    //                         ctx.textBaseline = 'middle';
    //                         const padding = 15;
    //                         const startY = 24;
    //                         const position = element.tooltipPosition();
    //                         ctx.fillText(dataString, position.x, startY);

    //                         ctx.save();

    //                         ctx.beginPath();
    //                         ctx.setLineDash([5, 3]);
    //                         ctx.moveTo(position.x, startY + padding);
    //                         ctx.lineTo(position.x, position.y - padding);
    //                         ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    //                         ctx.stroke();

    //                         ctx.restore();
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }
}

export class FilesDataSource extends DataSource<any>
{
    constructor(private widget11)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return this.widget11.onContactsChanged;
    }

    disconnect()
    {
    }
}

