import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { CourseService } from '../../../../../../services/course.service';
import { MomentModule } from 'angular2-moment';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';

@Component({
    selector: 'fuse-course-list-details',
    templateUrl: 'course-list-details.component.html',
    styleUrls: ['./course-list-details.component.scss']
})
export class CourseListDetailsComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;
    fec_registro: any;
    cor_id: any;
    course: any;

    constructor(
        public dialogRef: MatDialogRef<CourseListDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private momentModule: MomentModule,
        private router: Router
    ) {
        this.cor_id = data.cor_id;
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            cor_id        : [''],
            cor_name      : [''],
            cor_price     : [''],
            cor_des       : [''],
            cat_cor_name  : [''],
            num_alumnos   : [''],
            user_doc_id   : [''],
            user_doc_name : [''],
            user_reg_id   : [''],
            user_reg_name : [''],
            est_registro  : [''],
            fec_registro  : [''],
            cor_photo     : ['']
        });

        this.loadCourseDetials();

    }

    loadCourseDetials() {
                this.courseService.getCourseDetails(this.cor_id).subscribe(
                    successGlobalDetails => {
                        
                        this.course = successGlobalDetails.data_result[0];
                        const est_registro = this.course.est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                        this.fec_registro = this.course.fec_registro;
                         
                        this.formPersonal = this.formBuilder.group({
                            cor_id        : [this.course.cor_id],
                            cor_name      : [this.course.cor_name],
                            cor_price     : [this.course.cor_price],
                            cor_des       : [this.course.cor_des],
                            cat_cor_name  : [this.course.cat_cor_name],
                            num_alumnos   : [this.course.num_alumnos],
                            user_doc_id   : [this.course.user_doc_id],
                            user_doc_name : [this.course.user_doc_name],
                            user_reg_id   : [this.course.user_reg_id],
                            user_reg_name : [this.course.user_reg_name],
                            cor_photo     : [this.course.cor_photo],
                            est_registro  : [est_registro],
                            fec_registro  : [this.course.fec_registro]
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

    viewClassxCourse(){
        const encryptCourse = Base64.encode(this.cor_id.toString());
        this.router.navigate(['course/class/' + encryptCourse + '/list']);
        this.dialogRef.close();
    }
}
