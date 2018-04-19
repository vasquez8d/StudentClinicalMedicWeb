import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { ClassService } from '../../../../../../services/class.service';

@Component({
    selector: 'fuse-course-class-list-details',
    templateUrl: 'course-class-list-details.component.html',
    styleUrls: ['./course-class-list-details.component.scss']
})
export class CourseClassListDetailsComponent implements OnInit {

    formPersonal: FormGroup;
    fec_registro: any;
    est_registro: any;
    class_id: any;
    class: any;

    constructor(
        public dialogRef: MatDialogRef<CourseClassListDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private classService: ClassService,
        private momentModule: MomentModule
    ) {
        this.class_id = data.class_id;
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            class_id: [''],
            class_tittle: [''],
            class_desc: [''],
            class_time: [''],
            class_video_embed: [''],
            cor_name: [''],
            count: [''],
            user_reg_name: [''],
            est_registro: [''],
            fec_registro: ['']
        });

        this.loadCourseDetials();

    }

    loadCourseDetials() {
        this.classService.getClassDetails(this.class_id).subscribe(
            successGlobalDetails => {
                if (successGlobalDetails.data_result.length > 0){
                    this.class = successGlobalDetails.data_result[0];
                    this.est_registro = this.class.est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                    this.fec_registro = this.class.fec_registro;
                    this.formPersonal = this.formBuilder.group({
                        class_id: [this.class.class_id],
                        class_tittle: [this.class.class_tittle],
                        class_desc: [this.class.class_desc],
                        class_time: [this.class.class_time],
                        class_video_embed: [this.class.class_video_embed],
                        cor_name: [this.class.cor_name],
                        count: [this.class.count],
                        user_reg_name: [this.class.user_reg_name],
                        est_registro: [this.est_registro],
                        fec_registro: [this.fec_registro]
                    });
                }
            },
            error => {
                console.log('error_loadCourseDetials', error);
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
