import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { CourseService } from '../../../../services/course.service';
import { CorcategoryService } from '../../../../services/corcategory.service';
import { UserService } from '../../../../services/user.service';
import { AuthloginService } from '../../../../services/authlogin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
    selector: 'fuse-course-class-create',
    templateUrl: './course-class-create.component.html',
    styleUrls: ['./course-class-create.component.scss']
})
export class CourseClassCreateComponent implements OnInit {
    form: FormGroup;
    formErrors: any;

    myControl: FormControl = new FormControl();
    options = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

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

    constructor(
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private corCategoryService: CorcategoryService,
        private activateRouter: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private _location: Location,
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

        // this.horizontalStepperStep3Errors = {
        //     cor_video: {}
        // };

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

        // this.horizontalStepperStep3 = this.formBuilder.group({
        //     cor_video: ['', Validators.required]
        //     // postalCode: ['', [Validators.required, Validators.maxLength(5)]]
        // });

        this.horizontalStepperStep1.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.horizontalStepperStep2.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        // this.horizontalStepperStep3.valueChanges.subscribe(() => {
        //     this.onFormValuesChanged();
        // });

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );
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

    filter(val: string): string[] {
        return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    navigateBack2List(){
        this._location.back();
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
        const dataRegisterCourse1 = this.horizontalStepperStep1.value;
        const dataRegisterCourse2 = this.horizontalStepperStep2.value;
        // const dataRegisterCourse3 = this.horizontalStepperStep3.value;
        const dataCourse = this.courseService.getCourseJson(dataRegisterCourse1, 
                                                            dataRegisterCourse2, 
                                                            // dataRegisterCourse3, 
                                                            this.user_id);
        this.courseFileName = (<HTMLInputElement>document.getElementById('txtFileName')).value;

        this.courseService.postCourseRegister(dataCourse).subscribe(
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
                        // tslint:disable-next-line:triple-equals
                        if (this.courseFileName != ''){
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
                console.log('error_courseSaveInfo', err);
            }
        );
    }

    handleFileInput(event) {
        this.fileToUpload = <File>event.target.files[0];
        (<HTMLInputElement>document.getElementById('txtFileName')).value = this.fileToUpload.name;
        this.onFormValuesChanged();
    }

    saveImageFile(cor_id){
        this.courseService.postUploadCourseImage(this.fileToUpload).subscribe(
            sucess => {
                // tslint:disable-next-line:triple-equals
                if (sucess.res_service == 'ok'){
                    const dataUpdate = {
                        cor_id: cor_id,
                        cor_photo: sucess.data_result
                    };
                    this.courseService.postUpdateFileName(dataUpdate).subscribe(
                        sucessUpdate => {
                            console.log(sucessUpdate);
                        }, err => {
                            console.log('errr_postUpdateFileName', err);
                        }
                    );
                }
            }, err => {
                console.log('error_saveImageFile', err);
            }
        );
    }
}
