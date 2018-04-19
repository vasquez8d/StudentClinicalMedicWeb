import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseProfilePhotosVideosComponent } from './tabs/photos-videos/photos-videos.component';

import { UserService } from '../../../../services/user.service';
import { AuthloginService } from '../../../../services/authlogin.service';
import { MomentModule } from 'angular2-moment';
import { CourseDetailsComponent } from './course-details.component';
import { CourseDetailsInfoComponent } from './tabs/info/course-details-info.component';
import { CouseDetailsPeopleComponent } from './tabs/people/course-details-people.component';

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
        FuseProfilePhotosVideosComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule,
        MomentModule
    ],
    providers: [
        UserService,
        AuthloginService
    ]
})
export class CourseDetailsModule {
}
