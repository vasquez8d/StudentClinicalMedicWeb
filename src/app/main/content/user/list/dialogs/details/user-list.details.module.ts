import { NgModule } from '@angular/core';
import { UserListDetailsComponent } from './user-list.details.component';
import { CourseMaterialModule } from '../../../../course/course-material.module';
@NgModule({
    declarations: [
        UserListDetailsComponent
    ],
    imports: [
        CourseMaterialModule
    ]
})
export class UserListDetailsModule {
}
