import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ExamStartComponent } from './exam-start.component';
import { CourseMaterialModule } from '../../course/course-material.module';

const routes = [
    {
        path: ':test_num_ques/:test_type_id/:test_id/:test_categ_slug/:ques_time/start',
        component: ExamStartComponent,
    },
];

@NgModule({
    declarations: [
        ExamStartComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,

        CourseMaterialModule,

        FuseSharedModule
    ],
    providers: [

    ]
})
export class ExamStartModule {
}
