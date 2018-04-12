import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'fuse-user-list-details',
    templateUrl: 'user-list-details.component.html',
    styleUrls: ['./user-list-details.component.scss']
})
export class UserListDetailsComponent implements OnInit {

    formPersonal: FormGroup;

    selected: any;
    formErrors: any;

    user_id: any;

    constructor(
        public dialogRef: MatDialogRef<UserListDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private userModel: UserModel,
        private userService: UserService
    ) {
        this.user_id = data.user_id;
    }

    ngOnInit() {
        this.selected = 2;
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            user_pri_nom: [''],
            user_ape_pat: [''],
            user_ape_mat: [''],
            user_mail: [''],
            user_dni: [''],
            user_fec_nac: [''],
            user_dpt: [''],
            user_prv: [''],
            user_dst: [''],
            user_num_cell: [''],
            user_dir: [''],
        });

        this.loadGlobalUserDetials();

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
                            user_dni: [this.userModel.user.user_dni],
                            user_fec_nac: [this.userModel.user.user_fec_nac],
                            user_dpt: [this.userModel.user.user_dpt],
                            user_prv: [this.userModel.user.user_prv],
                            user_dst: [this.userModel.user.user_dst],
                            user_num_cell: [this.userModel.user.user_num_cell],
                            user_dir: [this.userModel.user.user_dir],
                        });

                    },
                    error => {
                        console.log('error_loadGlobalUserDetials', error);
                    }
                );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
