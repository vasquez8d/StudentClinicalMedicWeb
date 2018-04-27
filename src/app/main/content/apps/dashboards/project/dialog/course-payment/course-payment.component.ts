import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { CourseService } from '../../../../../../../services/course.service';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { AuthloginService } from '../../../../../../../services/authlogin.service';

@Component({
    selector: 'fuse-course-payment-dashboard',
    templateUrl: 'course-payment.component.html',
    styleUrls: ['./course-payment.component.scss']
})
export class CoursePaymentDashboardComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;
    fec_registro: any;
    cor_id: any;
    course: any;
    cor_name: any = '';

    user: any;

    constructor(
        public dialogRef: MatDialogRef<CoursePaymentDashboardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private momentModule: MomentModule,
        private authLoginService: AuthloginService,
        private router: Router
    ) {
        this.cor_id = data.cor_id;
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            cor_id: [''],
            cor_name: [''],
            cor_price: [''],
            cor_des: [''],
            cat_cor_name: [''],
            num_alumnos: [''],
            user_doc_id: [''],
            user_doc_name: [''],
            user_reg_id: [''],
            user_reg_name: [''],
            est_registro: [''],
            fec_registro: ['']
        });

        this.loadCourseDetials();

        this.authLoginService.getTokenUserLoged().subscribe(
            success => {
                this.user = success.data_result;
                this.courseService.getCourseListxUser(this.user.user_id).subscribe(
                    successCourse => {
                        if(successCourse.res_service == 'ok'){
                            successCourse.data_result.forEach(element => {
                                if(element.cor_id == this.cor_id){
                                    Swal({
                                        title: element.cor_name,
                                        text: 'Usted ya compró este curso, puedes verlo en la seccion "Mis Cursos"',
                                        type: 'info',
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Continuar',
                                    }).then((resultAcept) => {
                                        this.dialogRef.close();
                                        this.dialogRef.close();
                                    });
                                }
                            });
                        }
                    }, err => {
                        console.log(err);
                    }
                );
            }, err => {
                console.log(err);
            }
        );

    }

    loadCourseDetials() {
        this.courseService.getCourseDetails(this.cor_id).subscribe(
            successGlobalDetails => {
                this.course = successGlobalDetails.data_result[0];
                const est_registro = this.course.est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                this.fec_registro = this.course.fec_registro;
                this.cor_name     = this.course.cor_name;
                this.formPersonal = this.formBuilder.group({
                    cor_id: [this.course.cor_id],
                    cor_name: [this.course.cor_name],
                    cor_price: [this.course.cor_price],
                    cor_des: [this.course.cor_des],
                    cat_cor_name: [this.course.cat_cor_name],
                    num_alumnos: [this.course.num_alumnos],
                    user_doc_id: [this.course.user_doc_id],
                    user_doc_name: [this.course.user_doc_name],
                    user_reg_id: [this.course.user_reg_id],
                    user_reg_name: [this.course.user_reg_name],
                    est_registro: [est_registro],
                    fec_registro: [this.course.fec_registro]
                });
            },
            error => {
                console.log('error_loadGlobalUserDetials', error);
            }
        );
    }

    goToPaymentForm(){
        const encryptCourse = Base64.encode(this.cor_id.toString());
        this.router.navigate(['course/' + encryptCourse + '/' + '/payment']);
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
}
