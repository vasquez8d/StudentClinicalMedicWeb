import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthloginService } from '../../../../../services/authlogin.service';
import { GlobalUser } from '../../../../../global/globaluser';

import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import { UserRegProviderModel } from '../../../../../models/user-reg-provider.model';

@Component({
    selector   : 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class FuseLoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;

    loginIncorrect_email = false;
    loginIncorrect_password = false;

    imageUserProvider = false;
    imageUserProviderUrl = '';
    textUserProvider = '';

    textLogin = 'Ingresa con tus credenciales';

    login_incorrect_message = '';

    user: any = {
        user_mail : '',
        user_pw   : ''
    };

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authloginService: AuthloginService,
        private router: Router,
        private globalUser: GlobalUser,
        private userRegProvider: UserRegProviderModel,
        private socialAuthService: AuthService 
    )
    {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            email   : {},
            password: {}
        };
    }

    socialSignIn(socialPlatform: string) {
        
        let socialPlatformProvider;
        if (socialPlatform == 'facebook'){
          socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }else if (socialPlatform == 'google'){
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {               
            this.authloginService.checkUserProviderMail(userData).subscribe(
                success => {
                    if (success.res_service === 'ok'){
                        this.imageUserProvider = true;
                        this.imageUserProviderUrl = userData.image;
                        this.textUserProvider = userData.name;
                        this.textLogin = 'Ingresar como'
                        this.loginForm = this.formBuilder.group({
                            email   : [success.data_result.user_mail, [Validators.required, Validators.email]],
                            password: ['', Validators.required],
                            remember: [true]
                        });
                    }else{
                        this.userRegProvider.user = userData;
                        try {
                            this.router.navigateByUrl('/auth/regprovider');
                        } catch (err){
                            console.log(err);
                        }                        
                    }
                },
                error => {
                    console.log(error);
                }
            );
          }
        );
    }
    
    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            remember: [true]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        this.loginIncorrect_password = false;
        this.loginIncorrect_email = false;
        
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    login(){
        this.user.user_mail = this.loginForm.controls.email.value;
        this.user.user_pw = this.loginForm.controls.password.value;
        this.authloginService.login(this.user, this.loginForm.controls.remember.value).subscribe(
            success => {
                if (success.res_service === 'ok'){
                    this.globalUser.user = success.data_result;
                    location.href = '';
                }else{
                    if (success.type_error === 'email'){
                        this.loginIncorrect_password = false;
                        this.loginIncorrect_email = true;
                        this.login_incorrect_message = success.res_service;
                    } else if (success.type_error === 'password'){
                        this.loginIncorrect_password = true;
                        this.loginIncorrect_email = false;
                        this.login_incorrect_message = success.res_service;
                    }
                }
            },
            error => {
                console.log(error);
            }
        );
    }
}
