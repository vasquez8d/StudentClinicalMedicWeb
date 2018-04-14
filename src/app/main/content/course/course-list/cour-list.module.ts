import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MomentModule } from 'angular2-moment';
import { MatChipsModule } from '@angular/material';
import { CourseMaterialModule } from '../../course/course-material.module';
import { CourListComponent } from './cour-list.component';
import { CourseListUpdateComponent } from './dialog/update/course-list.update.component';
import { CourseListDetailsModule } from './dialog/details/course-list.details.module';
import { CourseListUpdateModule } from './dialog/update/course-list.update.module';
import { CourseListDetailsComponent } from './dialog/details/course-list.details.component';
const routes: Routes = [
    {
        path: 'list',
        component: CourListComponent
    }
];

@NgModule({
    declarations: [
        CourListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CourseMaterialModule,
        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        CourseListDetailsModule,
        CourseListUpdateModule,
        MomentModule,

        MatChipsModule
    ],
    entryComponents: [
        CourseListDetailsComponent,
        CourseListUpdateComponent
    ]
})
export class CourListModule {
}
