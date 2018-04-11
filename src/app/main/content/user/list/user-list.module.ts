import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

// import { CourListComponent } from './cour-list.component';
import { UserListComponent } from './user-list.component';
import { CourseMaterialModule } from '../../course/course-material.module';
import { UserListDetailsComponent } from './dialogs/details/user-list.details.component';
import { UserListDetailsModule } from './dialogs/details/user-list.details.module';
import { UserListUpdateModule } from './dialogs/update/user-list.update.module';
import { UserListUpdateComponent } from './dialogs/update/user-list.update.component';

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
        FuseWidgetModule,
        UserListDetailsModule,
        UserListUpdateModule
    ],
    entryComponents: [
        UserListDetailsComponent,
        UserListUpdateComponent
    ]
})
export class UserListModule {
}
