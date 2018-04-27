import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ExamIndexComponent } from './exam-index.component';
import { ExamIndexKpiComponent } from './tabs/exam-index-kpi/exam-index-kpi.component';
import { ExamIndexListComponent } from './tabs/exam-index-list/exam-index-list.component';

import { CourseMaterialModule } from '../../course/course-material.module';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExamIndexKpiService } from './tabs/exam-index-kpi/exam-index-kpi.service';
import { ExamIndexTypeComponent } from './dialog/exam-index-type/exam-index-type.component';
import { ExamIndexTypeModule } from './dialog/exam-index-type/exam-index-type.module';


const routes: Routes = [
    {
        path: '',
        component: ExamIndexComponent,
        resolve: {
            data: ExamIndexKpiService
        }
    }
];

@NgModule({
    declarations: [
        ExamIndexComponent,
        ExamIndexKpiComponent,
        ExamIndexListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        FuseWidgetModule,
        FuseHighlightModule,

        CourseMaterialModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        ChartsModule,
        NgxChartsModule,
        ExamIndexTypeModule
    ],
    providers: [
        ExamIndexKpiService
    ],
    entryComponents: [
        ExamIndexTypeComponent
    ]
})
export class ExamIndexModule {
}
