import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, 
        MatFormFieldModule, 
        MatIconModule, 
        MatInputModule, 
        MatSelectModule, 
        MatStepperModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { CourseCreateComponent } from './course-create.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseMaterialModule } from '../course-material.module';
import { LoadingModule } from 'ngx-loading';

const routes: Routes = [
    {
        path: 'create',
        component: CourseCreateComponent
    }
];

@NgModule({
    declarations: [
        CourseCreateComponent
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

        HttpClientModule,
        LoadingModule
    ]
})
export class CourseCreateModule {
}
