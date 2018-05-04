import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { CorcategoryService } from '../../../../../../../services/corcategory.service';
import { TestService } from '../../../../../../../services/test.service';

@Component({
    selector: 'fuse-exam-index-list-details',
    templateUrl: 'exam-index-list-details.component.html',
    styleUrls: ['./exam-index-list-details.component.scss']
})
export class ExamIndexListDetailsComponent implements OnInit {

    formPersonal: FormGroup;
    
    fec_registro: any;
    fec_finaliza: any;
    test_status: any;

    test_id: any;
    test: any;

    constructor(
        public dialogRef: MatDialogRef<ExamIndexListDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private momentModule: MomentModule,
        private testService: TestService
    ) {
        this.test_id = data.test_id;
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            cat_cor_name: [''],
            test_num_ques: [''],
            test_time: [''],
            test_ques_ok: [''],
            test_ques_bad: [''],
            test_ques_blank: [''],
            test_result: [''],            
        });
        this.loadTestDetails();
    }

    loadTestDetails(){
        this.testService.getTestDetails(this.test_id).subscribe(
            success => {
                this.test = success.data_result[0];
                
                this.test_status = this.test.test_status === 1 ? 'Iniciado' : 'Finalizado';
                this.fec_registro = this.test.fec_registro;
                this.fec_finaliza = this.test.test_fec_finaliza;

                this.formPersonal = this.formBuilder.group({
                    cat_cor_name    : [this.test.cat_cor_name],
                    test_num_ques   : [this.test.test_num_ques],
                    test_time       : [this.test.test_time],
                    test_ques_ok    : [this.test.test_ques_ok],
                    test_ques_bad   : [this.test.test_ques_bad],
                    test_ques_blank : [this.test.test_ques_blank],
                    test_result     : [this.test.test_result],
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
