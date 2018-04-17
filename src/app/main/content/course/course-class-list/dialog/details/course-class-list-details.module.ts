import { NgModule } from '@angular/core';

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
import { MomentModule } from 'angular2-moment';
import { CourseClassListDetailsComponent } from './course-class-list-details.component';
import { CourseMaterialModule } from '../../../course-material.module';

@NgModule({
    declarations: [
        CourseClassListDetailsComponent
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
export class CourseClassListDetailsModule {
}
