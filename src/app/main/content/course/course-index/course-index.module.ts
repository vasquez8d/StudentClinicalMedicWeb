import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, 
         MatFormFieldModule, 
         MatIconModule, 
         MatInputModule, 
         MatSelectModule, 
         MatSidenavModule,
         MatChipsModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { CoursesIndexComponent } from './courses/courses.component';
import { CourseIndexComponent } from './course/course.component';

import { CoursesIndexService } from './courses.service';
import { CourseIndexService } from './course.service';
import { MomentModule } from 'angular2-moment';
import { SafeHtmlPipe } from '../../../pipes/secure-url.pipe';

const routes = [
    {
        path     : ':user_id/info',
        component: CoursesIndexComponent,
        resolve  : {
            academy: CoursesIndexService
        }
    },
    {
        path     : ':cor_id/:cor_slug/start',
        component: CourseIndexComponent,
        resolve  : {
            academy: CourseIndexService
        }
    },
    {
        path      : '**',
        redirectTo: '../app/dashboard'
    }
];

@NgModule({
    declarations: [
        CoursesIndexComponent,
        CourseIndexComponent,
        SafeHtmlPipe
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MomentModule,
        FuseSharedModule,
        MatChipsModule,
    ],
    providers   : [
        CoursesIndexService,
        CourseIndexService
    ]
})
export class CourseIndexModule
{
}
