import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';
import { UserModel } from '../../../../models/user.model';

import * as _moment from 'moment';
import { Moment } from 'moment';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

const moment = _moment;
export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        monthYearA11yLabel: 'YYYY',
    },
};

@Component({
    selector   : 'fuse-user-update-forms',
    templateUrl: './user-update.component.html',
    styleUrls  : ['./user-update.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class UserUpdateComponent implements OnInit
{
    formPersonal: FormGroup;
    formAcademy: FormGroup;
    selected: any;
    formErrors: any;
    
    date = new FormControl(moment());

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userModel: UserModel,
        private activatedRoute: ActivatedRoute,
        private userService: UserService)
    {
        // Reactive form errors
        this.formErrors = {
            user_dni       : {},
            user_fec_nac   : {},
            user_dpt       : {},
            user_prv       : {},
            user_dst       : {},
            user_num_cell  : {},
            user_dir       : {},
            user_tim_aca   : {},
            user_est_civil : {}
        };
    }

    ngOnInit()
    {
        this.selected = 2;
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            user_pri_nom   : ['', Validators.required],
            user_ape_pat   : ['', Validators.required],
            user_ape_mat   : [''],
            user_mail      : [''],
            user_dni       : ['', Validators.required],
            user_fec_nac   : ['', Validators.required],
            user_dpt       : ['', Validators.required],
            user_prv       : ['', Validators.required],
            user_dst       : ['', Validators.required],
            user_num_cell  : ['', Validators.required],
            user_dir       : ['', Validators.required],
            user_tim_aca   : ['', Validators.required],
            user_est_civil : ['', Validators.required],
            user_flg_hijos : [''],
            user_flg_vsolo : [''],
            user_flg_inter : [''],
        });
        this.loadGlobalUserDetials();

        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.formAcademy = this.formBuilder.group({
            user_uni_procede : [''],
            user_uni_facu : [''],
            user_año_egreso_ingreso : [''],
            user_uni_ciclo : [''],
            user_flg_qto_sup : [''],
            user_internado : [''],
            user_hosp_internado: ['']
        });

        this.loadUserAcademyInfo();
    }

    loadGlobalUserDetials() {
        this.activatedRoute.params.subscribe( params => {
            if ( params.user_id ){
              const user_id = Base64.decode(params.user_id);
              this.userService.getUserDetailsUpdate(user_id).subscribe(
                successGlobalDetails => {
                    this.userModel.user = successGlobalDetails.data_result;
    
                    this.formPersonal = this.formBuilder.group({
                        user_pri_nom   : [this.userModel.user.user_pri_nom, Validators.required],
                        user_ape_pat   : [this.userModel.user.user_ape_pat, Validators.required],
                        user_ape_mat   : [this.userModel.user.user_ape_mat],
                        user_mail      : [this.userModel.user.user_mail],
                        user_dni       : [this.userModel.user.user_dni, Validators.required],
                        user_fec_nac   : [this.userModel.user.user_fec_nac, Validators.required],
                        user_dpt       : [this.userModel.user.user_dpt, Validators.required],
                        user_prv       : [this.userModel.user.user_prv, Validators.required],
                        user_dst       : [this.userModel.user.user_dst, Validators.required],
                        user_num_cell  : [this.userModel.user.user_num_cell, Validators.required],
                        user_dir       : [this.userModel.user.user_dir, Validators.required],
                        user_tim_aca   : [this.userModel.user.user_tim_aca, Validators.required],
                        user_est_civil : [this.userModel.user.user_est_civil, Validators.required],
                        user_flg_hijos : [this.userModel.user.user_flg_hijos],
                        user_flg_vsolo : [this.userModel.user.user_flg_vsolo],
                        user_flg_inter : [this.userModel.user.user_flg_inter],
                    });
    
                },
                error => {
                    console.log('error_loadGlobalUserDetials', error);
                }
            );
            }
          });
    }

    loadUserAcademyInfo(){
        this.activatedRoute.params.subscribe( params => {
            if ( params.user_id ){
              const user_id = Base64.decode(params.user_id);
              this.userService.getUserAcademyInfo(user_id).subscribe(
                success => {
                    this.formAcademy = this.formBuilder.group({
                        user_uni_procede: [success.data_result.user_uni_procede],
                        user_uni_facu: [success.data_result.user_uni_facu],
                        user_año_egreso_ingreso: [success.data_result.user_año_egreso_ingreso],
                        user_uni_ciclo: [success.data_result.user_uni_ciclo],
                        user_flg_qto_sup: [success.data_result.user_flg_qto_sup],
                        user_internado: [success.data_result.user_internado],
                        user_hosp_internado: [success.data_result.user_hosp_internado]
                    });

                }, err => {
                    console.log('error_loadUserAcademyInfo', err);
                }
            );
            }
          });
    }

    onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.formPersonal.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }

    finishHorizontalStepper()
    {
        alert('You have finished the horizontal stepper!');
    }

    finishVerticalStepper()
    {
        alert('You have finished the vertical stepper!');
    }

    navigateProfile(){
        this.activatedRoute.params.subscribe( params => {
            if ( params.user_id ){
              const user_id = Base64.decode(params.user_id);
              const encryptUser = Base64.encode(user_id.toString());
              this.router.navigate(['user/' + encryptUser + '/profile']);
            }
          });
    }

    saveUserInformation(){

        this.activatedRoute.params.subscribe(params => {
            if (params.user_id) {

                const user_id = Base64.decode(params.user_id);
                const encryptUser = Base64.encode(user_id.toString());

                const dataRegisterPersonal = this.formPersonal.value;
                dataRegisterPersonal['usu_registro'] = 'web';

                const dataRegisterAcademy = this.formAcademy.value;
                dataRegisterAcademy['usu_registro'] = 'web';
                dataRegisterAcademy['user_id'] = user_id;

                const userUpdate = {
                    user_id: user_id,
                    personalInfo: dataRegisterPersonal,
                    academyInfo: dataRegisterAcademy
                };

                this.userService.postUpdateUserInfo(userUpdate).subscribe(
                    success => {
                        // tslint:disable-next-line:triple-equals
                        if (success.res_service == 'ok'){
                            Swal({
                                title: 'Actualizar información',
                                text: 'Se registró correctamente la información.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar',
                            }).then((resultAcept) => {
                                this.router.navigate(['user/' + encryptUser + '/profile']);
                            });
                        }else{
                            Swal({
                                title: 'Actualizar información',
                                text: success.res_service,
                                type: 'info',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar',
                            }).then((resultAcept) => {
                            });
                        }
                    }, err => {
                        console.log(err);
                    }
                );
            }
        });
    }
}
