import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { UserRegisterProviderComponent } from './register-provider.component';

const routes = [
    {
        path     : 'regprovider',
        component: UserRegisterProviderComponent
    }
];

@NgModule({
    declarations: [
        UserRegisterProviderComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class UserRegisterProviderModule
{
}
