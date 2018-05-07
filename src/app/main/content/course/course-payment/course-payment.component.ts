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
import Swal from 'sweetalert2';
import { Base64 } from 'js-base64';
import { MomentModule } from 'angular2-moment';
import { MatService } from '../../../../services/mat.service';
import { DropBoxService } from '../../../../services/dropbox.service';
import { GlobalHelper } from '../../../../helpers/global.helper';

@Component({
    selector: 'fuse-course-payment',
    templateUrl: './course-payment.component.html',
    styleUrls: ['./course-payment.component.scss']
})
export class CoursePaymentComponent implements OnInit {
    form: FormGroup;
    formErrors: any;

    fileToUpload: File = null;
    courseFileName: any;

    user_id: any;
    cor_name: any = '';
    cor_id: any;
    fec_registro: any = '';
    course: any;
    form_valid = true;
    file_course_url: any; 

    public loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private activatedRouter: ActivatedRoute,
        private matService: MatService,
        private router: Router,
        private momentModule: MomentModule,
        private globalHelper: GlobalHelper,
        private dropboxService: DropBoxService,
        private authLoginService: AuthloginService) {
    }
    ngOnInit() {

        this.loadUserLoged();
        this.loadCourseDetails();
        
        // Reactive Form
        this.form = this.formBuilder.group({
            cor_name: [''],
            cat_cor_name: [''],
            cor_price: [''],
            user_doc_name: [''],
            cor_des: [''],
            fec_registro: [''],
            mat_voucher_img: ['']
        });
    }

    loadUserLoged() {
        this.authLoginService.getTokenUserLoged().subscribe(
            sucess => {
                if (sucess.res_service === 'ok') {
                    this.user_id = sucess.data_result.user_id;
                } else {
                    this.router.navigateByUrl('auth/login');
                }
            }, err => {
                console.log(err);
            }
        );
    }
    
    loadCourseDetails(){
        this.activatedRouter.params.subscribe(params => {
            if (params.cor_id) {
                const decode_code_id = Base64.decode(params.cor_id);
                this.cor_id = decode_code_id;
                this.courseService.getCourseDetails(decode_code_id).subscribe(
                    success => {
                        if (success.data_result.length > 0 ){
                            this.fec_registro = success.data_result[0].fec_registro;
                            this.cor_name = success.data_result[0].cor_name;
                            this.form = this.formBuilder.group({
                                cor_name: [success.data_result[0].cor_name],
                                cat_cor_name: [success.data_result[0].cat_cor_name],
                                cor_price: [success.data_result[0].cor_price],
                                user_doc_name: [success.data_result[0].user_doc_name],
                                cor_des: [success.data_result[0].cor_des],
                                fec_registro: [success.data_result[0].fec_registro],
                                mat_voucher_img: ['']
                            });
                        }
                    }, err => {
                        console.log(err);
                    }
                );
            }
        });
    }

    paymentSaveInfo() {

        Swal({
            title: 'Compra de un curso',
            text: 'Podrás obtener todas las clases del curso',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.loading = true;
                const newFileName = this.globalHelper.getDateFileName() + '-' + this.fileToUpload.name;
                this.dropboxService.postUploadVoucherFile(this.fileToUpload, newFileName).subscribe(
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
                                
                                const dataCourse = {
                                    cor_id: this.cor_id,
                                    user_alu_id: this.user_id,
                                    user_reg_id: this.user_id,
                                    usu_registro: 'web',
                                    mat_voucher_img: this.file_course_url
                                };
                                this.matService.postMatRegister(dataCourse).subscribe(
                                    successInsert => {
                                        this.loading = false;
                                        // tslint:disable-next-line:triple-equals
                                        if (successInsert.res_service == 'ok') {
                                            Swal({
                                                title: 'Compra de un curso',
                                                text: 'Se registró correctamente la información, pronto un administrador aprobará la compra y podrás disfrutar del curso.',
                                                type: 'success',
                                                showCancelButton: false,
                                                confirmButtonColor: '#3085d6',
                                                confirmButtonText: 'Continuar',
                                            }).then((resultAcept) => {
                                                const encryptCourse = Base64.encode(this.user_id.toString());
                                                this.router.navigate(['course/' + encryptCourse + '/' + '/info']);
                                            });
                                        } else {
                                            Swal({
                                                title: 'Actualizar información',
                                                text: successInsert.res_service,
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
                                
                            }, err => {
                                this.loading = false;
                                console.log(err);
                            }
                        );
                    }, err => {
                        this.loading = false;
                        console.log(err);
                    }
                );
            }
        });
    }

    handleFileInput(event) {
        this.fileToUpload = <File>event.target.files[0];
        (<HTMLInputElement>document.getElementById('txtFileName')).value = this.fileToUpload.name;
        this.form_valid = false;
    }
}
