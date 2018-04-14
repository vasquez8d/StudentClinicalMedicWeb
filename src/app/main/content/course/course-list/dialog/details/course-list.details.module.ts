import { NgModule } from '@angular/core';
import { CourseMaterialModule } from '../../../../course/course-material.module';
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
import { CourseListDetailsComponent } from './course-list.details.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
    declarations: [
        CourseListDetailsComponent
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
        CourseMaterialModule,
        MomentModule
    ]
})
export class CourseListDetailsModule {
}
