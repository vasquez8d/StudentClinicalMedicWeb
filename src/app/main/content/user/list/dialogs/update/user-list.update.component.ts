import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'fuse-user-list-update',
    templateUrl: 'user-list-update.component.html',
    styleUrls: ['./user-list-update.component.scss']
})
export class UserListUpdateComponent implements OnInit {

    formPersonal: FormGroup;
    formAcademy: FormGroup;
    selected: any;
    formErrors: any;

    user_id: any;

    constructor(
        public dialogRef: MatDialogRef<UserListUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private userModel: UserModel,
        private userService: UserService
    ) {
        this.user_id = data.user_id;
        // Reactive form errors
        this.formErrors = {
            user_dni: {},
            user_fec_nac: {},
            user_dpt: {},
            user_prv: {},
            user_dst: {},
            user_num_cell: {},
            user_dir: {},
            user_tim_aca: {},
            user_est_civil: {}
        };
    }

    ngOnInit() {
        this.selected = 2;
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            user_pri_nom: [''],
            user_ape_pat: [''],
            user_ape_mat: [''],
            user_mail: [''],
            user_dni: ['', Validators.required],
            user_fec_nac: ['', Validators.required],
            user_dpt: ['', Validators.required],
            user_prv: ['', Validators.required],
            user_dst: ['', Validators.required],
            user_num_cell: ['', Validators.required],
            user_dir: ['', Validators.required],
            user_tim_aca: ['', Validators.required],
            user_est_civil: ['', Validators.required],
            user_flg_hijos: [''],
            user_flg_vsolo: [''],
            user_flg_inter: [''],
        });
        this.loadGlobalUserDetials();

        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.formAcademy = this.formBuilder.group({
            user_pri_esp: [''],
            user_seg_esp: [''],
            user_pri_uni: [''],
            user_seg_uni: [''],
            user_uni_prc: [''],
            user_flg_qto_sup: ['']
        });
        this.loadUserAcademyInfo();
    }

    loadGlobalUserDetials() {
                this.userService.getUserDetailsUpdate(this.user_id).subscribe(
                    successGlobalDetails => {
                        this.userModel.user = successGlobalDetails.data_result;

                        this.formPersonal = this.formBuilder.group({
                            user_pri_nom: [this.userModel.user.user_pri_nom],
                            user_ape_pat: [this.userModel.user.user_ape_pat],
                            user_ape_mat: [this.userModel.user.user_ape_mat],
                            user_mail: [this.userModel.user.user_mail],
                            user_dni: [this.userModel.user.user_dni, Validators.required],
                            user_fec_nac: [this.userModel.user.user_fec_nac, Validators.required],
                            user_dpt: [this.userModel.user.user_dpt, Validators.required],
                            user_prv: [this.userModel.user.user_prv, Validators.required],
                            user_dst: [this.userModel.user.user_dst, Validators.required],
                            user_num_cell: [this.userModel.user.user_num_cell, Validators.required],
                            user_dir: [this.userModel.user.user_dir, Validators.required],
                            user_tim_aca: [this.userModel.user.user_tim_aca, Validators.required],
                            user_est_civil: [this.userModel.user.user_est_civil, Validators.required],
                            user_flg_hijos: [this.userModel.user.user_flg_hijos],
                            user_flg_vsolo: [this.userModel.user.user_flg_vsolo],
                            user_flg_inter: [this.userModel.user.user_flg_inter],
                        });

                    },
                    error => {
                        console.log('error_loadGlobalUserDetials', error);
                    }
                );
    }

    loadUserAcademyInfo() {
                this.userService.getUserAcademyInfo(this.user_id).subscribe(
                    success => {
                        this.formAcademy = this.formBuilder.group({
                            user_pri_esp: [success.data_result.user_pri_esp],
                            user_seg_esp: [success.data_result.user_seg_esp],
                            user_pri_uni: [success.data_result.user_pri_uni],
                            user_seg_uni: [success.data_result.user_seg_uni],
                            user_uni_prc: [success.data_result.user_uni_prc],
                            user_flg_qto_sup: [success.data_result.user_flg_qto_sup]
                        });
                    }, err => {
                        console.log('error_loadUserAcademyInfo', err);
                    }
                );
    }

    onFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.formPersonal.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    saveUserInformation() {

                const dataRegisterPersonal = this.formPersonal.value;
                dataRegisterPersonal['usu_registro'] = 'web';

                const dataRegisterAcademy = this.formAcademy.value;
                dataRegisterAcademy['usu_registro'] = 'web';
                dataRegisterAcademy['user_id'] = this.user_id;

                const userUpdate = {
                    user_id: this.user_id,
                    personalInfo: dataRegisterPersonal,
                    academyInfo: dataRegisterAcademy
                };

                console.log(userUpdate);

                this.userService.postUpdateUserInfo(userUpdate).subscribe(
                    success => {
                        // tslint:disable-next-line:triple-equals
                        if (success.res_service == 'ok') {
                            Swal({
                                title: 'Actualizar información',
                                text: 'Se registró correctamente la información.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar',
                            }).then((resultAcept) => {
                                console.log(userUpdate);
                            });
                        } else {
                            Swal({
                                title: 'Actualizar información',
                                text: success.res_service,
                                type: 'info',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar',
                            }).then((resultAcept) => {
                                console.log(success);
                            });
                        }
                    }, err => {
                        console.log(err);
                    }
                );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
