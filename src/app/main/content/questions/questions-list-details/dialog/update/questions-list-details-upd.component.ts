import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import { CorcategoryService } from '../../../../../../services/corcategory.service';
import { MomentModule } from 'angular2-moment';
import { QuesService } from '../../../../../../services/questions.service';
@Component({
    selector: 'fuse-questions-list-details-upd',
    templateUrl: 'questions-list-details-upd.component.html',
    styleUrls: ['./questions-list-details-upd.component.scss']
})
export class CourseListDetailsUpdComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;

    data_id: any;
    ques_id: any;

    fec_registro: any = '';
    cab_est_registro: any = '';
    det_est_registro: any = '';
    usu_registro: any = '';

    ListCourseCategory: any;
    ListTeachers: any;
    ListQuestions: any;

    question: any;

    constructor(
        public dialogRef: MatDialogRef<CourseListDetailsUpdComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private corCategoryService: CorcategoryService,
        private momentModule: MomentModule,
        private quesService: QuesService
    ) {
        this.data_id = data.data_id;
        this.ques_id = data.ques_id;

        this.formErrors = {
            cor_name: {},
            cor_des: {},
            cor_price: {},
            cat_cor_id: {},
            user_doc_id: {},
        };
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            ques_id: [''],
            data_id: ['', Validators.required],
            ques_name: ['', Validators.required],
            ques_question: ['', Validators.required],
            cat_cor_id: ['', Validators.required],
            ques_res1: ['', Validators.required],
            ques_res2: ['', Validators.required],
            ques_res3: ['', Validators.required],
            ques_res4: ['', Validators.required],
            ques_res5: ['', Validators.required],
            ques_ok: ['', Validators.required]
        });
        this.loadQuestionDetails();
        this.loadCourseCategory();
        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    loadQuestionDetails(){
        this.quesService.getQueUploadDetails(this.data_id, this.ques_id).subscribe(
            success => {
                this.question = success.data_result[0];

                this.cab_est_registro = this.question.cab_est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                this.det_est_registro = this.question.det_est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                this.fec_registro = this.question.fec_registro;
                this.usu_registro = this.question.usu_registro;

                this.ListQuestions = [
                    {
                        ques_num: 1,
                        ques_name: this.question.ques_res1
                    },
                    {
                        ques_num: 2,
                        ques_name: this.question.ques_res2
                    },
                    {
                        ques_num: 3,
                        ques_name: this.question.ques_res3
                    },
                    {
                        ques_num: 4,
                        ques_name: this.question.ques_res4
                    },
                    {
                        ques_num: 5,
                        ques_name: this.question.ques_res5
                    }
                ]

                this.formPersonal = this.formBuilder.group({
                    ques_id: [this.question.ques_id],
                    data_id: [this.question.data_id],
                    ques_name: [this.question.ques_name, Validators.required],
                    ques_question: [this.question.ques_question, Validators.required],
                    cat_cor_id: [this.question.cat_cor_id, Validators.required],
                    ques_res1: [this.question.ques_res1, Validators.required],
                    ques_res2: [this.question.ques_res2, Validators.required],
                    ques_res3: [this.question.ques_res3, Validators.required],
                    ques_res4: [this.question.ques_res4, Validators.required],
                    ques_res5: [this.question.ques_res5, Validators.required],
                    ques_ok: [this.question.ques_ok, Validators.required]
                });
            }, err => {
                console.log(err);
            }
        );
    }

    loadCourseCategory(){
        this.corCategoryService.getCorCategoryList().subscribe(
            sucess => {
                this.ListCourseCategory = sucess.data_result;
            }, err => {
                
            }
        );
    }

    onFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.formPersonal.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    saveUserInformation() {
                const dataRegisterCourse = this.formPersonal.value;
                this.quesService.postUpdateQuestion(dataRegisterCourse).subscribe(
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
                        console.log(err);
                    }
                );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
