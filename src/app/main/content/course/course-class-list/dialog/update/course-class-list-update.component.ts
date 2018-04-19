import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { ClassService } from '../../../../../../services/class.service';

@Component({
    selector: 'fuse-course-class-list-update',
    templateUrl: 'course-class-list-update.component.html',
    styleUrls: ['./course-class-list-update.component.scss']
})
export class CourseClassListUpdateComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;
    fec_registro: any;
    est_registro: any;
    class_id: any;

    cor_name: any;
    cor_num_comments: any;
    user_reg_name: any;

    class: any;

    constructor(
        public dialogRef: MatDialogRef<CourseClassListUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private classService: ClassService,
        private momentModule: MomentModule
    ) {
        this.class_id = data.class_id;
        this.formErrors = {
            class_tittle: {},
            class_desc: {},
            class_video_embed: {},
            class_time: {}
        };
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            class_id: [''],
            class_tittle: ['', Validators.required],
            class_desc: ['', Validators.required],
            class_video_embed: ['', Validators.required],
            class_time       : ['', Validators.required]
        });

        this.loadClassDetails();
        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    loadClassDetails() {
        this.classService.getClassDetails(this.class_id).subscribe(
            success => {
                console.log(success);
                if (success.data_result.length > 0){
                    this.cor_name = success.data_result[0].cor_name;
                    this.cor_num_comments = success.data_result[0].count;
                    this.user_reg_name = success.data_result[0].user_reg_name;
                    this.class = success.data_result[0];
                    this.fec_registro = this.class.fec_registro;
                    this.est_registro = this.class.est_registro === 1 ? 'Habilitado' : 'Deshabilitado';

                    this.formPersonal = this.formBuilder.group({
                        class_id: [this.class.class_id],
                        class_tittle: [this.class.class_tittle, Validators.required],
                        class_desc: [this.class.class_desc, Validators.required],
                        class_video_embed: [this.class.class_video_embed, Validators.required],
                        class_time: [this.class.class_time, Validators.required]
                    });
                }
            }, err => {
                console.log(err);
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
        const dataRegisterClass = this.formPersonal.value;
        console.log(dataRegisterClass);
        this.classService.postClassUpdate(dataRegisterClass).subscribe(
            success => {
                console.log(success);
                // tslint:disable-next-line:triple-equals
                if (success.res_service == 'ok') {
                    Swal({
                        title: 'Actualizar información',
                        text: 'Se actualizó correctamente la información.',
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
