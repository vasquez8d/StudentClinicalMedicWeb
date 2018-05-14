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
import { Base64 } from 'js-base64';

import Swal from 'sweetalert2';
import { ClassService } from '../../../../services/class.service';
import { GlobalHelper } from '../../../../helpers/global.helper';
import { DropBoxService } from '../../../../services/dropbox.service';

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
    courseName: any;
    user_id: any;
    cor_id: any;
    file_course_url: any;

    public loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private classSerivce: ClassService,
        private corCategoryService: CorcategoryService,
        private activateRouter: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private _location: Location,
        private dropboxService: DropBoxService,
        private globalHelper: GlobalHelper,
        private authLoginService: AuthloginService) {
        // Reactive form errors
        this.formErrors = {
            class_tittle: {},
            class_desc: {},
            class_video_embed: {},
            class_time: {},
        };

        this.horizontalStepperStep1Errors = {
            class_tittle: {},
            class_desc: {},
        };

        this.horizontalStepperStep2Errors = {
            class_video_embed: {},
            class_time: {}
        };
    }
    ngOnInit() {
        this.loadCourseName();
        this.loadUserLoged();

        // Reactive Form
        this.form = this.formBuilder.group({
            class_tittle: ['', Validators.required],
            class_desc: ['', Validators.required],
            class_video_embed: ['', Validators.required],
            class_time: ['', Validators.required],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this.formBuilder.group({
            class_tittle: ['', Validators.required],
            class_desc: ['', Validators.required],
        });

        this.horizontalStepperStep2 = this.formBuilder.group({
            class_video_embed: ['', Validators.required],
            class_time: ['', Validators.required],
        });

        this.horizontalStepperStep1.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.horizontalStepperStep2.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    loadCourseName() {
        this.activateRouter.params.subscribe(params => {
            if (params.cor_id) {
                const decode_code_id = Base64.decode(params.cor_id);
                this.cor_id = decode_code_id;
                this.courseService.getCourseDetails(decode_code_id).subscribe(
                    success => {
                        this.courseName = success.data_result[0].cor_name;
                    }, err => {
                        console.log(err);
                    }
                );
            }
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

    handleFileInput(event) {
        this.fileToUpload = <File>event.target.files[0];
        (<HTMLInputElement>document.getElementById('txtFileName')).value = this.fileToUpload.name;
    }

    saveFileCourse(class_id) {
        const newFileName = this.globalHelper.getDateFileName() + '-' + this.fileToUpload.name;
        this.dropboxService.postUploadClassFile(this.fileToUpload, newFileName).subscribe(
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
                            class_id: class_id,
                            class_file: this.file_course_url,
                            class_file_flag: 1,
                            class_file_name: newFileName
                        };
                        this.classSerivce.postUpdateFileName(dataUpdate).subscribe(
                            sucessUpdate => {
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

    classSaveInfo() {
        this.loading = true;
        const dataRegisterCourse1 = this.horizontalStepperStep1.value;
        const dataRegisterCourse2 = this.horizontalStepperStep2.value;

        const dataClass = this.classSerivce.getClassJson(dataRegisterCourse1, 
                                                         dataRegisterCourse2, 
                                                         this.user_id,
                                                         this.cor_id);     
        this.courseFileName = (<HTMLInputElement>document.getElementById('txtFileName')).value;                                                  
        this.classSerivce.postClassRegister(dataClass).subscribe(
            success => {
                this.loading = false;
                // tslint:disable-next-line:triple-equals
                if (success.res_service == 'ok') {
                    Swal({
                        title: 'Nueva Clase',
                        text: 'Se registró correctamente la información.',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar',
                    }).then((resultAcept) => {
                        // tslint:disable-next-line:triple-equals
                        if (this.courseFileName != '') {
                            this.saveFileCourse(success.data_result.class_id);
                        }
                        this._location.back();
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
                        this._location.back();
                    });
                }
            }, err => {
                this.loading = false;
                console.log('error_courseSaveInfo', err);
            }
        );
    }
}
