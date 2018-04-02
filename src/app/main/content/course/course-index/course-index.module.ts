import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, 
        MatFormFieldModule, 
        MatIconModule, 
        MatInputModule, 
        MatSelectModule, 
        MatSidenavModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { CoursesIndexComponent } from './courses/courses.component';
import { CourseIndexComponent } from './course/course.component';

import { CoursesIndexService } from './courses.service';
import { CourseIndexService } from './course.service';

const routes = [
    {
        path     : '',
        component: CoursesIndexComponent,
        resolve  : {
            academy: CoursesIndexService
        }
    },
    {
        path     : ':courseId/:courseSlug',
        component: CourseIndexComponent,
        resolve  : {
            academy: CourseIndexService
        }
    },
    {
        path      : '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [
        CoursesIndexComponent,
        CourseIndexComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,

        FuseSharedModule
    ],
    providers   : [
        CoursesIndexService,
        CourseIndexService
    ]
})
export class CourseIndexModule
{
}
