import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

// import { CourListComponent } from './cour-list.component';
import { UserListComponent } from './user-list.component';
import { CourseMaterialModule } from '../../course/course-material.module';

const routes: Routes = [
    {
        path: 'list',
        component: UserListComponent
    }
];

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CourseMaterialModule,
        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class UserListModule {
}
