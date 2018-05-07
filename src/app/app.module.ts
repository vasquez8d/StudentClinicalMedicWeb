import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseFakeDbService } from './fuse-fake-db/fuse-fake-db.service';
import { FuseMainModule } from './main/main.module';
import { AppStoreModule } from './store/store.module';

import { AuthGuard } from './guard/auth.guard';
import { GlobalUser } from './global/globaluser';
import { LoginGuard } from './guard/login.guard';
import { NavigationService } from './services/navigation.service';
import { GlobalValues } from './global/globalvalues';

import { APP_ROUTING } from './app.router';
import { AuthloginService } from './services/authlogin.service';

import { MomentModule } from 'angular2-moment';
import { UserService } from './services/user.service';
import { HttpHelper } from './helpers/http.helper';
import { GlobalHelper } from './helpers/global.helper';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        APP_ROUTING,
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FuseFakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        AppStoreModule,
        FuseMainModule,
        MomentModule
    ],
    providers: [AuthGuard, GlobalUser, GlobalValues, LoginGuard, NavigationService, 
        AuthloginService, UserService, HttpHelper, GlobalHelper],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
