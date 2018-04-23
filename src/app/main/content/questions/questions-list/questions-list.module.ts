import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule, FuseMaterialColorPickerModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MomentModule } from 'angular2-moment';
import { MatChipsModule } from '@angular/material';
import { CourseMaterialModule } from '../../course/course-material.module';


import { QuestionsListComponent } from './questions-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: QuestionsListComponent
    }
];

@NgModule({
    declarations: [
        QuestionsListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CourseMaterialModule,
        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        MomentModule,

        FuseMaterialColorPickerModule,

        MatChipsModule
    ],
    entryComponents: [
    ]
})
export class QuestionsListModule {
}
