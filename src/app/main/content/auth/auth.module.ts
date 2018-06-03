import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LoginModule } from './authentication/login/login.module';
import { RegisterModule } from './authentication/register/register.module';
import { ForgotPasswordModule } from './authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './authentication/reset-password/reset-password.module';

import { AuthloginService } from '../../../services/authlogin.service';
import { AuthregisterService } from '../../../services/authregister.service';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angular5-social-login';
import { UserRegProviderModel } from '../../../models/user-reg-provider.model';
import { UserRegisterProviderModule } from './authentication/register-provider/register-provider.module';

// Configs 
export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('203124637131720')
          },
        //   {
        //     id: GoogleLoginProvider.PROVIDER_ID,
        //     provider: new GoogleLoginProvid("Your-Google-Client-Id")
        //   },
        ]
    );
    return config;
  }
// Services

@NgModule({
    imports: [
        // Auth
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,

        UserRegisterProviderModule,

        HttpModule,

        SocialLoginModule
    ],
    providers: [
        AuthloginService,
        AuthregisterService,
        {
            provide : AuthServiceConfig,
            useFactory : getAuthServiceConfigs
        },
        UserRegProviderModel
    ]
})
export class AuthModule { }
