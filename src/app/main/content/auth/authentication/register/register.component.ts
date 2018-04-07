import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthregisterService } from '../../../../../services/authregister.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalUser } from '../../../../../global/globaluser';

import Swal from 'sweetalert2';

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

    bValidarEmail : boolean = true;
    bAceptar      : boolean = false;

    validateMail: any;

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
            user_ape_mat    : [''],
            code_validate   : ['']
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
    validateEmail(){
        const dataRegister = this.registerForm.value;
        this.authregisterService.generateCodeValidateMail(dataRegister.user_mail).subscribe(
            success => {
                if (success.res_service === 'ok') {
                    this.bValidarEmail = false;
                    Swal({
                        title: 'Validación de correo electrónico',
                        text: 'Se envío un código a tu correo electrónico, ingresalo para finalizar el registro.',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar',
                    }).then((resultAcept) => {
                        this.validateMail = success.data_result;
                        this.bAceptar = true;
                    });
                } else {
                    console.log(success.des_error);
                }
            }
        )
    }
    register(){
        const dataRegister = this.registerForm.value;
        if(dataRegister.code_validate == ''){
            Swal( "Error de validación" ,  "Se debe ingresar un valor para la validación." ,  "error" );
        }else{
            if(this.validateMail.val_code == dataRegister.code_validate){
                Swal({
                    title: 'Validación de correo electrónico',
                    text: 'Se validó correctamente el correo electrónico.',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar',
                }).then((resultAcept) => {
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
                });
            }else{
                Swal( "Error de validación" ,  "El código de validación no es el correcto." ,  "info" );
            }
        }
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
