import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseToolbarComponent } from 'app/main/toolbar/toolbar.component';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { AuthloginService } from '../../services/authlogin.service';
import { HttpModule } from '@angular/http';
import { UserModel } from '../../models/user.model';

@NgModule({
    declarations: [
        FuseToolbarComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        HttpModule
    ],
    providers: [
        AuthloginService,
        UserModel
    ],
    exports     : [
        FuseToolbarComponent
    ]
})
export class FuseToolbarModule
{
}
