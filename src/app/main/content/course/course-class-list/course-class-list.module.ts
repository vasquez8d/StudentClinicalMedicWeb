import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MomentModule } from 'angular2-moment';
import { MatChipsModule } from '@angular/material';
import { CourseMaterialModule } from '../../course/course-material.module';

import { CourseClassListComponent } from './course-class-list.component';
import { CourseClassListUpdateComponent } from './dialog/update/course-class-list-update.component';
import { CourseClassListDetailsComponent } from './dialog/details/course-class-list-details.component';
import { CourseClassListDetailsModule } from './dialog/details/course-class-list-details.module';
import { CourseClassListUpdateModule } from './dialog/update/course-class-list-update.module';

const routes: Routes = [
    {
        path: 'class/:cor_id/list',
        component: CourseClassListComponent
    }
];

@NgModule({
    declarations: [
        CourseClassListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CourseMaterialModule,
        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        CourseClassListDetailsModule,
        CourseClassListUpdateModule,
        MomentModule,

        MatChipsModule
    ],
    entryComponents: [
        CourseClassListDetailsComponent,
        CourseClassListUpdateComponent
    ]
})
export class CourseClassListModule {
}
