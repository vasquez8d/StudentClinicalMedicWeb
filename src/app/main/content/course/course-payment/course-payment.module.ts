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

import { HttpClientModule } from '@angular/common/http';
import { CourseMaterialModule } from '../course-material.module';
import { CoursePaymentComponent } from './course-payment.component';
import { MomentModule } from 'angular2-moment';
import { MatService } from '../../../../services/mat.service';
import { LoadingModule } from 'ngx-loading';


const routes: Routes = [
    {
        path: ':cor_id/payment',
        component: CoursePaymentComponent
    }
];

@NgModule({
    declarations: [
        CoursePaymentComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        FuseSharedModule,
        CourseMaterialModule,
        MomentModule,
        HttpClientModule,
        LoadingModule
    ],
    providers: [
        MatService
    ]
})

export class CoursePaymentModule {
}
