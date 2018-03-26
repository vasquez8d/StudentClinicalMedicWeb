import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthregisterService } from '../../../../../services/authregister.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalUser } from '../../../../../global/globaluser';

@Component({
    selector   : 'fuse-register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    animations : fuseAnimations
})
export class FuseRegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;

    registerIncorrect_email = false;
    reg_incorrect_message = '';

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authregisterService: AuthregisterService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private globalUser: GlobalUser
    )
    {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.registerFormErrors = {
            user_pri_nom    : {},
            user_mail       : {},
            user_pw         : {},
            user_pw_confirm : {},
            user_ape_pat    : {}
        };
    }

    ngOnInit()
    {
        this.registerForm = this.formBuilder.group({
            user_pri_nom    : ['', Validators.required],
            user_mail       : ['', [Validators.required, Validators.email]],
            user_pw         : ['', Validators.required],
            user_pw_confirm : ['', [Validators.required, confirmPassword]],
            user_ape_pat    : ['', Validators.required],
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
        this.authregisterService.registerwo(dataRegister).subscribe(
            success => {
                if (success.res_service === 'ok') {
                    // console.log(this.globalUser.user);
                    // this.router.navigateByUrl('');
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
