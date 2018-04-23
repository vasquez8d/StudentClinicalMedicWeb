import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';

import { MomentModule } from 'angular2-moment';

import { CorcategoryService } from '../../../services/corcategory.service';
import { CourseService } from '../../../services/course.service';
import { QuestionsListModule } from './questions-list/questions-list.module';
import { QuestionsListDetailsModule } from './questions-list-details/questions-list-details.module';
import { QuesService } from '../../../services/questions.service';

@NgModule({
    imports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseCountdownModule,
        FuseHighlightModule,
        FuseMaterialColorPickerModule,
        FuseWidgetModule,

        MomentModule,

        QuestionsListModule,
        QuestionsListDetailsModule
    ],
    providers: [
        CorcategoryService,
        CourseService,
        QuesService
    ]
})
export class QuestionsModule {
}
