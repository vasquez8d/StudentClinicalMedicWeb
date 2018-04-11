import { NgModule } from '@angular/core';
import { CourseMaterialModule } from '../../../../course/course-material.module';
import { UserListUpdateComponent } from './user-list.update.component';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [
        UserListUpdateComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        FuseSharedModule,
        CourseMaterialModule
    ]
})
export class UserListUpdateModule {
}
