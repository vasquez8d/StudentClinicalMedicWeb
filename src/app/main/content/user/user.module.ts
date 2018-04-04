import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';

import { UserUpdateModule } from './update/user-update.module';
import { ProfileModule } from './profile/profile.module';
import { UserModel } from '../../../models/user.model';
import { UserListModule } from './list/user-list.module';


@NgModule({
    imports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseCountdownModule,
        FuseHighlightModule,
        FuseMaterialColorPickerModule,
        FuseWidgetModule,

        ProfileModule,
        UserListModule,
        UserUpdateModule
    ],
    providers: [
        UserModel
    ]
})
export class UserModule
{
    
}
