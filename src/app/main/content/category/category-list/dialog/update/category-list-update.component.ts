import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';

import Swal from 'sweetalert2';
import { CorcategoryService } from '../../../../../../services/corcategory.service';
import { CourseService } from '../../../../../../services/course.service';
import { MomentModule } from 'angular2-moment';

@Component({
    selector: 'fuse-category-list-update',
    templateUrl: 'category-list-update.component.html',
    styleUrls: ['./category-list-update.component.scss']
})
export class CategoryListUpdateComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;
    cat_cor_id: any;
    usu_regText: any;
    fec_registro: any;
    category: any;

    constructor(
        public dialogRef: MatDialogRef<CategoryListUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private corCategoryService: CorcategoryService,
        private momentModule: MomentModule
    ) {
        this.cat_cor_id = data.cat_cor_id;
        // Reactive form errors
        this.formErrors = {
            cat_cor_name: [''],
            cat_cor_desc: [''],
        };
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            cat_cor_id: [''],
            cat_cor_name: [''],
            cat_cor_desc: [''],
            usu_registro: [''],
            num_cursos: [''],
            fec_registro: [''],
            est_registro: ['']
        });

        this.loadCourseDetials();

        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    loadCourseDetials() {
        this.corCategoryService.getCategoryDetails(this.cat_cor_id).subscribe(
            successGlobalDetails => {
                this.category = successGlobalDetails.data_result;
                const est_registro = this.category.est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                this.fec_registro = this.category.fec_registro;
                this.formPersonal = this.formBuilder.group({
                    cat_cor_id: [this.category.cat_cor_id],
                    cat_cor_name: [this.category.cat_cor_name],
                    cat_cor_desc: [this.category.cat_cor_desc],
                    usu_registro: [this.category.usu_registro],
                    num_cursos: [this.category.num_cursos],
                    fec_registro: [this.category.fec_registro],
                    est_registro: [est_registro]
                });

            },
            error => {
                console.log('error_loadCourseDetials', error);
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
        const dataForm = this.formPersonal.value;
        const dataUpdate = {
            cat_cor_id: this.cat_cor_id,
            cat_cor_name: dataForm.cat_cor_name,
            cat_cor_desc: dataForm.cat_cor_desc
        };

        this.corCategoryService.postCategoryUpdate(dataUpdate).subscribe(
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
