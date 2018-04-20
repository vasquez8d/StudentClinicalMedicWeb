import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { Base64 } from 'js-base64';
import { CourseService } from '../../../../../../services/course.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector   : 'fuse-course-details-info',
    templateUrl: './course-details-info.component.html',
    styleUrls: ['./course-details-info.component.scss'],
    animations : fuseAnimations
})
export class CourseDetailsInfoComponent implements OnInit
{
    about: any;
    user: any;
    cor_name: any;
    
    formPersonal: FormGroup;
    formErrors: any;
    fec_registro: any;
    cor_id: any;
    course: any;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private courseService: CourseService,
                private activatedRoute: ActivatedRoute)
    {
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
            fec_registro  : ['']
        });

        this.loadCourseDetails();
    }

    loadCourseDetails() {
        this.activatedRoute.params.subscribe(params => {
            if (params.cor_id) {
                const cor_id = Base64.decode(params.cor_id);
                this.courseService.getCourseDetails(cor_id).subscribe(
                    success => {
                        this.course = success.data_result[0];                        
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
                            est_registro  : [est_registro],
                            fec_registro  : [this.course.fec_registro]
                        });
                    },
                    error => {
                        console.log('error_loadCourseDetails', error);
                    }
                );
            }
        });
    }
}
