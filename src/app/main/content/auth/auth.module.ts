import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LoginModule } from './authentication/login/login.module';
import { RegisterModule } from './authentication/register/register.module';
import { ForgotPasswordModule } from './authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './authentication/reset-password/reset-password.module';

import { AuthloginService } from '../../../services/authlogin.service';
import { AuthregisterService } from '../../../services/authregister.service';

// Services

@NgModule({
    imports: [
        // Auth
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        HttpModule
    ],
    providers: [
        AuthloginService,
        AuthregisterService
    ]
})
export class AuthModule { }
