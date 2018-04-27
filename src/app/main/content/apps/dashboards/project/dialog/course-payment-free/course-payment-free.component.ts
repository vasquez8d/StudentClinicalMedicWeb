import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { CourseService } from '../../../../../../../services/course.service';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { MatService } from '../../../../../../../services/mat.service';
import { AuthloginService } from '../../../../../../../services/authlogin.service';

@Component({
    selector: 'fuse-course-payment-free-dashboard',
    templateUrl: 'course-payment-free.component.html',
    styleUrls: ['./course-payment-free.component.scss']
})
export class CoursePaymentFreeDashboardComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;
    fec_registro: any;
    cor_id: any;
    course: any;
    cor_name: any = '';
    user: any;

    constructor(
        public dialogRef: MatDialogRef<CoursePaymentFreeDashboardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private momentModule: MomentModule,
        private matService: MatService,
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

        this.authLoginService.getTokenUserLoged().subscribe(
            success => {
                this.user = success.data_result;
            }, err => {
                console.log(err);
            }
        );

        this.loadCourseDetials();

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

    buyCourseFree(){

        const dataReg = {
            cor_id : this.cor_id,
            user_alu_id: this.user.user_id,
            mat_state: '3',
            usu_registro: 'web'
        };

        this.matService.postMatRegisterFree(dataReg).subscribe(
            success => {
                console.log(dataReg);
            }, err => {
                console.log(err);
            }
        );

        const encryptCourse = Base64.encode(this.user.user_id.toString());
        this.router.navigate(['course/' + encryptCourse + '/' + '/info']);
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
}
