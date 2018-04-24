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
import { MomentModule } from 'angular2-moment';
import { MatService } from '../../../../services/mat.service';
import { CourseMaterialModule } from '../../course/course-material.module';
import { QuestionsUploadComponent } from './questions-upload.component';


const routes: Routes = [
    {
        path: 'upload',
        component: QuestionsUploadComponent
    }
];

@NgModule({
    declarations: [
        QuestionsUploadComponent
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
        HttpClientModule
    ],
    providers: [
        MatService
    ]
})

export class QuestionsUploadModule {
}
