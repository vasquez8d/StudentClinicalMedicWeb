import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { CourseService } from '../../../../services/course.service';
import { CorcategoryService } from '../../../../services/corcategory.service';
import { UserService } from '../../../../services/user.service';
import { AuthloginService } from '../../../../services/authlogin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DropBoxService } from '../../../../services/dropbox.service';
import { GlobalHelper } from '../../../../helpers/global.helper';

@Component({
    selector: 'fuse-course-create',
    templateUrl: './course-create.component.html',
    styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
    form: FormGroup;
    formErrors: any;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    // horizontalStepperStep3: FormGroup;

    horizontalStepperStep1Errors: any;
    horizontalStepperStep2Errors: any;
    // horizontalStepperStep3Errors: any;
    
    fileToUpload: File = null;
    courseFileName: any;
    ListCourseCategory: any;
    ListTeachers: any;

    user_id: any;
    file_course_url: any;

    public loading = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private corCategoryService: CorcategoryService,
        private userService: UserService,
        private router: Router,
        private globalHelper: GlobalHelper,
        private dropboxService: DropBoxService,
        private authLoginService: AuthloginService) {
        // Reactive form errors
        this.formErrors = {
            cor_name: {},
            cor_price: {},
            cat_cor_id: {},
            user_doc_id: {},
            cor_des: {},
            cor_intro: {},
            cor_video: {}
        };

        // Horizontal Stepper form error
        this.horizontalStepperStep1Errors = {
            cor_name: {},
            cor_price: {},
            cat_cor_id: {},
            user_doc_id: {}
        };

        this.horizontalStepperStep2Errors = {
            cor_des: {},
            cor_intro: {}
        };

    }
    ngOnInit() {

        this.loadUserLoged();
        this.loadCourseCategory();
        this.loadListTeacher();
        // Reactive Form
        this.form = this.formBuilder.group({
            cor_name: ['', Validators.required],
            cor_price: ['', Validators.required],
            cat_cor_id: ['', Validators.required],
            user_doc_id: ['', Validators.required],
            cor_des: ['', Validators.required],
            cor_intro: ['', Validators.required],
            cor_photo: [''],
            cor_video: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this.formBuilder.group({
            cor_name: ['', Validators.required],
            cor_price: ['', Validators.required],
            cat_cor_id: ['', Validators.required],
            user_doc_id: ['', Validators.required],
        });

        this.horizontalStepperStep2 = this.formBuilder.group({
            cor_des: ['', Validators.required],
            cor_intro: ['', Validators.required],
            cor_photo: [''],
        });

        this.horizontalStepperStep1.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.horizontalStepperStep2.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    loadUserLoged(){
        this.authLoginService.getTokenUserLoged().subscribe(
            sucess => {
                if (sucess.res_service === 'ok'){
                    this.user_id = sucess.data_result.user_id;
                }else{
                    this.router.navigateByUrl('auth/login');
                }
            }, err => {
                console.log(err);
            }
        );
    }
    
    loadCourseCategory() {
        this.corCategoryService.getCorCategoryList().subscribe(
            sucess => {
                this.ListCourseCategory = sucess.data_result;
            }, err => {

            }
        );
    }

    loadListTeacher() {
        this.userService.getListTechers().subscribe(
            success => {
                this.ListTeachers = success.data_result;
            }, err => {
                console.log('error_loadListTeacher', err);
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
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    courseSaveInfo() {

        Swal({
            title: '¿Estas seguro de registrar el curso?',
            text: 'El curso aparecerá el la página principal del sistema.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.loading = true;
                const dataRegisterCourse1 = this.horizontalStepperStep1.value;
                const dataRegisterCourse2 = this.horizontalStepperStep2.value;
                const dataCourse = this.courseService.getCourseJson(dataRegisterCourse1,
                    dataRegisterCourse2,
                    this.user_id);
                this.courseFileName = (<HTMLInputElement>document.getElementById('txtFileName')).value;
                this.courseService.postCourseRegister(dataCourse).subscribe(
                    success => {
                        this.loading = false;
                        // tslint:disable-next-line:triple-equals
                        if (success.res_service == 'ok') {
                            Swal({
                                title: 'Creación de un nuevo curso',
                                text: 'Se registró correctamente la información.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar',
                            }).then((resultAcept) => {
                                // tslint:disable-next-line:triple-equals
                                if (this.courseFileName != '') {
                                    this.saveImageFile(success.data_result.cor_id);
                                }
                                this.router.navigateByUrl('course/list');
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
                        this.loading = false;
                        console.log('error_courseSaveInfo', err);
                    }
                );
            }
        });
    }

    handleFileInput(event) {
        this.fileToUpload = <File>event.target.files[0];
        (<HTMLInputElement>document.getElementById('txtFileName')).value = this.fileToUpload.name;
        this.onFormValuesChanged();
    }

    saveImageFile(cor_id){
        const newFileName = this.globalHelper.getDateFileName() + '-' + this.fileToUpload.name;
        this.dropboxService.postUploadCorFile(this.fileToUpload, newFileName).subscribe(
            success => {
                const dataShared = {
                    'path': success.path_lower,
                    'settings': {
                        'requested_visibility': 'public'
                    }
                };
                this.dropboxService.postSharedLink(dataShared).subscribe(
                    successShared => {
                        this.file_course_url = 'https://dl.dropboxusercontent.com/s/' + successShared.url.substring(26, successShared.url.length);
                        const dataUpdate = {
                            cor_id: cor_id,
                            cor_photo: this.file_course_url
                        };
                        this.courseService.postUpdateFileName(dataUpdate).subscribe(
                            sucessUpdate => {
                                console.log(sucessUpdate);
                            }, err => {
                                console.log('errr_postUpdateFileName', err);
                            }
                        );
                    }, err => {
                        console.log(err);
                    }
                );
            }, err => {
                console.log(err);
            }
        );
    }
}
