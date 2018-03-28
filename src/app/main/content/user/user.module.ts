import { NgModule } from '@angular/core';
import { ProfileModule } from './profile/profile.module';
import { UserModel } from '../../../models/user.model';
import { UserListModule } from './list/user-list.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';

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

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';


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
        UserListModule
    ],
    providers: [
        UserModel
    ]
})
export class UserModule
{
    
}
