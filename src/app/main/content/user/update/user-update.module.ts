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
import { UserUpdateComponent } from './user-update.component';

const routes: Routes = [
    {
        path: ':user_id/update',
        component: UserUpdateComponent
    }
];

@NgModule({
    declarations: [
        UserUpdateComponent
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
        MaterialModule
    ]
})
export class UserUpdateModule {
}
