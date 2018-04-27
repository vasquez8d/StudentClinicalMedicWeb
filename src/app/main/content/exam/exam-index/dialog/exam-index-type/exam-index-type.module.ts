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
import { MomentModule } from 'angular2-moment';
import { ExamIndexTypeComponent } from './exam-index-type.component';
@NgModule({
    declarations: [
        ExamIndexTypeComponent
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
export class ExamIndexTypeModule {
}
