import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, 
        MatFormFieldModule, 
        MatIconModule, 
        MatInputModule, 
        MatSelectModule, 
        MatStepperModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CourseClassCreateComponent } from './course-class-create.component';
import { CourseMaterialModule } from '../course-material.module';

const routes: Routes = [
    {
        path: 'class/:cor_id/create',
        component: CourseClassCreateComponent
    }
];

@NgModule({
    declarations: [
        CourseClassCreateComponent
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

        HttpClientModule
    ]
})
export class CourseClassCreateModule {
}
