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
import { ExamStartService } from './exam-start.service';

const routes = [
    {
        path: 'start/:courseId',
        component: ExamStartComponent,
        resolve: {
            academy: ExamStartService
        }
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

        FuseSharedModule
    ],
    providers: [
        ExamStartService
    ]
})
export class ExamStartModule {
}
