import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';

import Swal from 'sweetalert2';
import { CorcategoryService } from '../../../../../../services/corcategory.service';
import { CourseService } from '../../../../../../services/course.service';
import { MomentModule } from 'angular2-moment';
import { Error404Module } from '../../../../pages/errors/404/error-404.module';

@Component({
    selector: 'fuse-category-list-create',
    templateUrl: 'category-list-create.component.html',
    styleUrls: ['./category-list-create.component.scss']
})
export class CategoryListCreateComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;

    fec_registroFormat: any;
    est_registroText: any;
    usu_regText: any;

    constructor(
        public dialogRef: MatDialogRef<CategoryListCreateComponent>,
        private formBuilder: FormBuilder,
        private corCategoryService: CorcategoryService,
        private momentModule: MomentModule
    ) {
        // Reactive form errors
        this.formErrors = {
            cat_cor_name: {},
            cat_cor_desc: {}
        };
    }

    ngOnInit() {
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            cat_cor_name: ['', Validators.required],
            cat_cor_desc: ['', Validators.required],
        });

        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

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

    clearInputs(){
        this.formPersonal = this.formBuilder.group({
            cat_cor_name: ['', Validators.required],
            cat_cor_desc: ['', Validators.required],
        });
    }

    saveUserInformation() {
        const dataRegisterCategory = this.formPersonal.value;
        dataRegisterCategory['usu_registro'] = 'web';

        this.corCategoryService.postCategoryRegister(dataRegisterCategory).subscribe(
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
                        this.clearInputs();
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
                        this.clearInputs();
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
