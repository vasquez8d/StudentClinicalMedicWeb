import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, 
         MatDividerModule, 
         MatFormFieldModule, 
         MatIconModule, 
         MatMenuModule, 
         MatSelectModule, 
         MatSidenavModule, 
         MatTableModule, 
         MatTabsModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { FuseProjectDashboardComponent } from './project.component';
import { MomentModule } from 'angular2-moment';

import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';
import { CourseMaterialModule } from '../../../course/course-material.module';
import { ProjectCoursesIndexService } from './project-courses.service';

const routes: Routes = [
    {
        path     : '**',
        component: FuseProjectDashboardComponent,
        resolve  : {
            academy: ProjectCoursesIndexService
        }
    }
];

@NgModule({
    declarations: [
        FuseProjectDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        CdkTableModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseWidgetModule,
        MomentModule,

        CourseMaterialModule,

        AngularWeatherWidgetModule.forRoot({
            key: 'c22e86af051ce37943c8680a279e789d',
            name: WeatherApiName.OPEN_WEATHER_MAP,
            baseUrl: 'http://api.openweathermap.org/data/2.5'
        })
    ],
    providers   : [
        ProjectCoursesIndexService
    ]
})
export class FuseProjectDashboardModule
{
}

