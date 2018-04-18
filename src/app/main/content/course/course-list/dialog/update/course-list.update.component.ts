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
    selector: 'fuse-course-list-update',
    templateUrl: 'course-list-update.component.html',
    styleUrls: ['./course-list-update.component.scss']
})
export class CourseListUpdateComponent implements OnInit {

    formPersonal: FormGroup;

    selected: any;
    formErrors: any;

    cor_id: any;
    
    fec_registroFormat: any;
    est_registroText: any;
    usu_regText: any;

    ListCourseCategory: any;
    ListTeachers: any;

    constructor(
        public dialogRef: MatDialogRef<CourseListUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private userModel: UserModel,
        private userService: UserService,
        private courseService: CourseService,
        private corCategoryService: CorcategoryService,
        private momentModule: MomentModule
    ) {
        this.cor_id = data.cor_id;
        // Reactive form errors
        this.formErrors = {
            cor_name: {},
            cor_des: {},
            cor_price: {},
            cat_cor_id: {},
            user_doc_id: {},
        };
    }

    ngOnInit() {
        this.selected = 2;
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            cor_id: [''],
            cor_name: ['', Validators.required],
            cor_des: ['', Validators.required],
            cor_price: ['', Validators.required],
            cat_cor_id: ['', Validators.required],
            user_doc_id: ['', Validators.required],
            usu_registro: ['']
        });

        this.loadCourseDetails();
        this.loadCourseCategory();
        this.loadListTeacher();
        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    loadListTeacher(){
        this.userService.getListTechers().subscribe(
            success => {
                this.ListTeachers = success.data_result;
            }, err => {
                console.log('error_loadListTeacher', err);
            }
        );
    }

    loadCourseDetails(){
        this.courseService.getCourseDetailsUpdate(this.cor_id).subscribe(   
            success => {
                const course = success.data_result[0];
                
                this.fec_registroFormat = course.fec_registro;
                this.est_registroText = course.est_registro === 1 ? 'Habilitado' : 'Deshabilitado';

                this.userService.getUserDetails(course.user_reg_id).subscribe(
                    sucessUser => {
                        this.usu_regText = sucessUser.data_result.user_pri_nom + ' ' + sucessUser.data_result.user_ape_pat;
                        this.formPersonal = this.formBuilder.group({
                            cor_id: [course.cor_id],
                            cor_name: [course.cor_name, Validators.required],
                            cor_des: [course.cor_des, Validators.required],
                            cor_price: [course.cor_price, Validators.required],
                            cat_cor_id: [course.cat_cor_id, Validators.required],
                            user_doc_id: [course.user_doc_id, Validators.required],
                            usu_registro: [course.usu_registro]
                        });
                    }, err => {
                        console.log(err);
                    }
                );

            }, err => {
                console.log(err);
            }
        );
    }

    loadCourseCategory(){
        this.corCategoryService.getCorCategoryList().subscribe(
            sucess => {
                this.ListCourseCategory = sucess.data_result;
            }, err => {
                
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
                const dataRegisterCourse = this.formPersonal.value;
                this.courseService.postCourseUpdate(dataRegisterCourse).subscribe(
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
