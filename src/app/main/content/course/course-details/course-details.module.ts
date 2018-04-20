import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, MatFormFieldModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { UserService } from '../../../../services/user.service';
import { AuthloginService } from '../../../../services/authlogin.service';
import { MomentModule } from 'angular2-moment';
import { CourseDetailsComponent } from './course-details.component';
import { CourseDetailsInfoComponent } from './tabs/info/course-details-info.component';
import { CouseDetailsPeopleComponent } from './tabs/people/course-details-people.component';
import { CourseService } from '../../../../services/course.service';
import { CourseDetailsClassComponent } from './tabs/class/course-details-class.component';
import { CourseMaterialModule } from '../course-material.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

const routes = [
    {
        path: ':cor_id/:cor_slug/details',
        component: CourseDetailsComponent
    }
];

@NgModule({
    declarations: [
        CourseDetailsComponent,
        CouseDetailsPeopleComponent,
        CourseDetailsInfoComponent,
        CourseDetailsClassComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatTabsModule,
        CourseMaterialModule,
        FuseSharedModule,
        MomentModule,
        FuseWidgetModule
    ],
    providers: [
        UserService,
        AuthloginService,
        CourseService
    ]
})
export class CourseDetailsModule {
}
