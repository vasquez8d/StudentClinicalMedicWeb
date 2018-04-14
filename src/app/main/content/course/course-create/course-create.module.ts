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
import { MaterialModule } from '../../components/angular-material/material.module';
import { HttpClientModule } from '@angular/common/http';

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
        MaterialModule,

        HttpClientModule
    ]
})
export class CourseCreateModule {
}
