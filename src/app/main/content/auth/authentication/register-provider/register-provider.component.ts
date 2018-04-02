import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthregisterService } from '../../../../../services/authregister.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegProviderModel } from '../../../../../models/user-reg-provider.model';

@Component({
    selector   : 'fuse-user-register-provider',
    templateUrl: './register-provider.component.html',
    styleUrls  : ['./register-provider.component.scss'],
    animations : fuseAnimations
})
export class UserRegisterProviderComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;
    registerIncorrect_email = false;
    reg_incorrect_message = '';
    userProvider: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authregisterService: AuthregisterService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userRegProvider: UserRegProviderModel
    )
    {
        if(userRegProvider.user.email != ''){
            this.userProvider = userRegProvider.user;
        }else{
            try{
                this.router.navigateByUrl('/auth/login');
            }catch(err){
                console.log(err);
            }
        }

        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.registerFormErrors = {
            user_pw         : {},
            user_pw_confirm : {},
        };
    }

    ngOnInit()
    {
        console.log(this.userProvider);
        const names = this.userProvider.name.split(" ");
        this.userProvider["user_name"] = names[0];

        if(names.length > 1){
            this.userProvider["user_priap"] = names[1];
        }

        this.registerForm = this.formBuilder.group({
            user_pri_nom    : [this.userProvider.user_name],
            user_mail       : [this.userProvider.email],
            user_pw         : ['', Validators.required],
            user_pw_confirm : ['', [Validators.required, confirmPassword]],
            user_ape_pat    : [this.userProvider.user_priap],
            user_ape_mat    : ['']
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged()
    {
        this.registerIncorrect_email = false;
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

    register(){
        const dataRegister = this.registerForm.value;
        dataRegister["user_reg_provider"] = this.userProvider.provider;
        dataRegister["user_reg_provider_id"] = this.userProvider.id;
        this.authregisterService.registerwo(dataRegister).subscribe(
            success => {
                if (success.res_service === 'ok') {
                    location.href = '';
                } else {
                    if (success.type_error === 'email')
                    {
                        this.registerIncorrect_email = true;
                        this.reg_incorrect_message = success.res_service;
                    }
                }
            },
            error => {
                console.log(error);
            }
        );

    }
}

function confirmPassword(control: AbstractControl)
{
    if ( !control.parent || !control )
    {
        return;
    }

    const user_pw = control.parent.get('user_pw');
    const user_pw_confirm = control.parent.get('user_pw_confirm');

    if (!user_pw || !user_pw_confirm )
    {
        return;
    }

    if (user_pw_confirm.value === '' )
    {
        return;
    }

    if (user_pw.value !== user_pw_confirm.value )
    {
        return {
            passwordsNotMatch: true
        };
    }
}
