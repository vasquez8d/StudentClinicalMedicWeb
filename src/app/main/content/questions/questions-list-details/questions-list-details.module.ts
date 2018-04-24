import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule, FuseMaterialColorPickerModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MomentModule } from 'angular2-moment';
import { MatChipsModule } from '@angular/material';
import { CourseMaterialModule } from '../../course/course-material.module';


import { QuestionsListDetailsComponent } from './questions-list-details.component';
import { QuestionsListDetailsDetComponent } from './dialog/details/questions-list-details-det.component';
import { QuestionsListDetailsDetModule } from './dialog/details/questions-list-details-det.module';
import { CourseListDetailsUpdComponent } from './dialog/update/questions-list-details-upd.component';
import { QuestionsListDetailsUpdModule } from './dialog/update/questions-list-details-upd.module';

const routes: Routes = [
    {
        path: ':data_id/details',
        component: QuestionsListDetailsComponent
    }
];

@NgModule({
    declarations: [
        QuestionsListDetailsComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CourseMaterialModule,
        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        MomentModule,

        FuseMaterialColorPickerModule,

        MatChipsModule,
        QuestionsListDetailsDetModule,
        QuestionsListDetailsUpdModule
    ],
    entryComponents: [
        QuestionsListDetailsDetComponent,
        CourseListDetailsUpdComponent
    ]
})
export class QuestionsListDetailsModule {
}
