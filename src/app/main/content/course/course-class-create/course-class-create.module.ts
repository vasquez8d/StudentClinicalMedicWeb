import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, 
        MatFormFieldModule, 
        MatIconModule, 
        MatInputModule, 
        MatSelectModule, 
        MatStepperModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { MaterialModule } from '../../components/angular-material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CourseClassCreateComponent } from './course-class-create.component';

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
        MaterialModule,

        HttpClientModule
    ]
})
export class CourseClassCreateModule {
}
