import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';

import Swal from 'sweetalert2';
import { CorcategoryService } from '../../../../../../services/corcategory.service';
import { CourseService } from '../../../../../../services/course.service';
import { MomentModule } from 'angular2-moment';
import { AuthloginService } from '../../../../../../services/authlogin.service';
@Component({
    selector: 'fuse-exam-index-type',
    templateUrl: 'exam-index-type.component.html',
    styleUrls: ['./exam-index-type.component.scss']
})
export class ExamIndexTypeComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;
    
    numberQuestions1 = false;
    numberQuestions2 = false;

    user_pri_nom: any = '';
    user_ape_pat: any = '';
    user_mail: any = '';
    user_photo: any = '';
    user_id: any = '';

    examTimeText: any = '';
    examTimeMinutes: any= 0;

    ListExamType = [
        {
            text: 'ENAM',
            code: 1
        },
        {
            text: 'EsSalud',
            code: 2
        },
        {
            text: 'Salud Pública',
            code: 3
        },
        {
            text: 'Ciencias Básicas',
            code: 4
        },
        {
            text: 'Ginecología',
            code: 5
        },
        {
            text: 'Pediatría',
            code: 6
        },
        {
            text: 'Cirugía',
            code: 7
        },
        {
            text: 'Medicina Interna',
            code: 8
        },
    ];

    ListExamQuestions1 = [
        {
            number: 200
        },
        {
            number: 100
        },
        {
            number: 50
        },
        {
            number: 25
        },
        {
            number: 10
        }
    ]

    ListExamQuestions2 = [
        {
            number: 100
        },
        {
            number: 50
        },
        {
            number: 25
        },
        {
            number: 10
        }
    ]

    constructor(
        public dialogRef: MatDialogRef<ExamIndexTypeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private momentModule: MomentModule,
        private authLoingService: AuthloginService
    ) {
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
            type_id: ['', Validators.required],
            ques_num : ['', Validators.required]
        });

        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.authLoingService.getTokenUserLoged().subscribe(
            success => {
                this.user_pri_nom = success.data_result.user_pri_nom;
                this.user_ape_pat = success.data_result.user_ape_pat;
                this.user_mail    = success.data_result.user_mail;
                this.user_photo   = success.data_result.user_reg_provider_photo;
                this.user_id      = success.data_result.user_id;
            }, err => {
                console.log(err);
            }
        );

    }

    changeTypeExam(type_id){
        if(type_id == 1){
            this.numberQuestions1 = true;
            this.numberQuestions2 = false;
        }else{
            this.numberQuestions1 = false;
            this.numberQuestions2 = true;
        }
    }

    changeNumQuestions(value){
        switch(value){
            case 200:
                this.examTimeText = '4 Horas';
                this.examTimeMinutes = 240;
                break;
            case 100:
                this.examTimeText = '2 Horas';
                this.examTimeMinutes = 120;            
                break;
            case 50:
                this.examTimeText = '1 Hora';
                this.examTimeMinutes = 60;            
                break;
            case 25:
                this.examTimeText = '30 Minutos';
                this.examTimeMinutes = 30;            
                break;
            case 10:
                this.examTimeText = '12 Minutos';
                this.examTimeMinutes = 12;            
                break;
        }        
    }

    startExam(){
        
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
                // this.courseService.postCourseUpdate(dataRegisterCourse).subscribe(
                //     success => {
                //         // tslint:disable-next-line:triple-equals
                //         if (success.res_service == 'ok') {
                //             Swal({
                //                 title: 'Actualizar información',
                //                 text: 'Se registró correctamente la información.',
                //                 type: 'success',
                //                 showCancelButton: false,
                //                 confirmButtonColor: '#3085d6',
                //                 confirmButtonText: 'Continuar',
                //             }).then((resultAcept) => {
                //             });
                //         } else {
                //             Swal({
                //                 title: 'Actualizar información',
                //                 text: success.res_service,
                //                 type: 'info',
                //                 showCancelButton: false,
                //                 confirmButtonColor: '#3085d6',
                //                 confirmButtonText: 'Continuar',
                //             }).then((resultAcept) => {
                //             });
                //         }
                //     }, err => {
                //         console.log(err);
                //     }
                // );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
