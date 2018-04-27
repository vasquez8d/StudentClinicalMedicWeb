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
import { CourseMaterialModule } from '../../../../../course/course-material.module';
import { CoursePaymentFreeDashboardComponent } from './course-payment-free.component';

@NgModule({
    declarations: [
        CoursePaymentFreeDashboardComponent
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
export class CoursePaymentFreeDashboardModule {
}
