import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { CourseService } from '../../../../../../services/course.service';
import { MomentModule } from 'angular2-moment';
import { QuesService } from '../../../../../../services/questions.service';

@Component({
    selector: 'fuse-questions-list-details-det',
    templateUrl: 'questions-list-details-det.component.html',
    styleUrls: ['./questions-list-details-det.component.scss']
})
export class QuestionsListDetailsDetComponent implements OnInit {

    formPersonal: FormGroup;

    fec_registro: any = '';
    cab_est_registro: any = '';
    det_est_registro: any = '';

    data_id: any;
    ques_id: any;
    question: any;

    ques_res1: any = '';
    ques_res2: any = '';
    ques_res3: any = '';
    ques_res4: any = '';
    ques_res5: any = '';

    ques_ok: any = '';

    ques_res1_ok = false;
    ques_res2_ok = false;
    ques_res3_ok = false;
    ques_res4_ok = false;
    ques_res5_ok = false;

    constructor(
        public dialogRef: MatDialogRef<QuestionsListDetailsDetComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private momentModule: MomentModule,
        private quesService: QuesService
    ) {
        this.data_id = data.data_id;
        this.ques_id = data.ques_id;
        this.ques_res1_ok = false;
        this.ques_res2_ok = false;
        this.ques_res3_ok = false;
        this.ques_res4_ok = false;
        this.ques_res5_ok = false;
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            data_file_name: [''],
            ques_name: [''],
            cat_cor_name: [''],
            ques_question: [''],
            usu_registro: ['']            
        });

        this.loadUploadDetails();
    }

    loadUploadDetails(){
        this.quesService.getQueUploadDetails(this.data_id, this.ques_id).subscribe(
            success => {
                this.question = success.data_result[0];
                this.cab_est_registro = this.question.cab_est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                this.det_est_registro = this.question.det_est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                this.fec_registro = this.question.fec_registro;
                
                this.ques_res1 = this.question.ques_res1;
                this.ques_res2 = this.question.ques_res2;
                this.ques_res3 = this.question.ques_res3;
                this.ques_res4 = this.question.ques_res4;
                this.ques_res5 = this.question.ques_res5;
                this.ques_ok = this.question.ques_ok;

                switch (this.ques_ok){
                    case 1:
                        this.ques_res1_ok = true;
                        break;
                    case 2:
                        this.ques_res2_ok = true;
                        break;
                    case 3:
                        this.ques_res3_ok = true;
                        break;
                    case 4:
                        this.ques_res4_ok = true;
                        break;
                    case 5:
                        this.ques_res5_ok = true;
                        break;                                                                                                
                }

                this.formPersonal = this.formBuilder.group({
                    data_file_name: [this.question.data_file_name],
                    ques_name: [this.question.ques_name],
                    cat_cor_name: [this.question.cat_cor_name],
                    ques_question: [this.question.ques_question],
                    usu_registro: [this.question.usu_registro]
                });
            }, err => {
                console.log(err);
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
