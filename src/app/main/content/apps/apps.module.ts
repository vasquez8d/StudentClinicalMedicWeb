import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { CourseMaterialModule } from '../course/course-material.module';

const routes = [
    {
        path        : 'dashboard',
        loadChildren: './dashboards/project/project.module#FuseProjectDashboardModule'
    },
    {
        path        : 'chat',
        loadChildren: './chat/chat.module#FuseChatModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#FuseCalendarModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#FuseContactsModule'
    },
];

@NgModule({
    imports     : [
        FuseSharedModule,
        RouterModule.forChild(routes),
        CourseMaterialModule
    ],
    declarations: []
})
export class FuseAppsModule
{
}
