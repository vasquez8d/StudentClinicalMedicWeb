import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'fuse-user-list-role',
    templateUrl: 'user-list-role.component.html',
    styleUrls: ['./user-list-role.component.scss']
})
export class UserListRoleComponent implements OnInit {

    formPersonal: FormGroup;

    selected: any;
    formErrors: any;

    user_id: any;

    constructor(
        public dialogRef: MatDialogRef<UserListRoleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private userModel: UserModel,
        private userService: UserService
    ) {
        this.user_id = data.user_id;
        // Reactive form errors
        this.formErrors = {
            rol_id: {}
        };
    }

    ngOnInit() {
        this.selected = 2;
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            user_pri_nom: [''],
            user_ape_pat: [''],
            user_ape_mat: [''],
            user_mail   : [''],
            rol_id      : ['', Validators.required],
        });

        this.loadGlobalUserDetials();

        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    loadGlobalUserDetials() {
                this.userService.getUserDetailsUpdate(this.user_id).subscribe(
                    successGlobalDetails => {
                        this.userModel.user = successGlobalDetails.data_result;

                        this.formPersonal = this.formBuilder.group({
                            user_pri_nom: [this.userModel.user.user_pri_nom],
                            user_ape_pat: [this.userModel.user.user_ape_pat],
                            user_ape_mat: [this.userModel.user.user_ape_mat],
                            user_mail   : [this.userModel.user.user_mail],
                            rol_id      : [this.userModel.user.rol_id, Validators.required]
                        });

                    },
                    error => {
                        console.log('error_loadGlobalUserDetials', error);
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

                const userUpdate = {
                    user_id: this.user_id,
                    personalInfo: dataRegisterPersonal
                };

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
