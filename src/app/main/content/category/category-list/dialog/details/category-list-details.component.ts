import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { CourseService } from '../../../../../../services/course.service';
import { MomentModule } from 'angular2-moment';
import { CorcategoryService } from '../../../../../../services/corcategory.service';

@Component({
    selector: 'fuse-category-list-details',
    templateUrl: 'category-list-details.component.html',
    styleUrls: ['./category-list-details.component.scss']
})
export class CategoryListDetailsComponent implements OnInit {

    formPersonal: FormGroup;
    fec_registro: any;

    cat_cor_id: any;
    category: any;

    constructor(
        public dialogRef: MatDialogRef<CategoryListDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private corCategoryService: CorcategoryService,
        private momentModule: MomentModule
    ) {
        this.cat_cor_id = data.cat_cor_id;
    }

    ngOnInit() {

        this.formPersonal = this.formBuilder.group({
            cat_cor_id: [''],
            cat_cor_name: [''],
            cat_cor_desc: [''],
            usu_registro: [''],
            num_cursos: [''],
            fec_registro: [''],
            est_registro: ['']
        });

        this.loadCourseDetials();

    }

    loadCourseDetials() {
        this.corCategoryService.getCategoryDetails(this.cat_cor_id).subscribe(
            successGlobalDetails => {
                this.category = successGlobalDetails.data_result;
                const est_registro = this.category.est_registro === 1 ? 'Habilitado' : 'Deshabilitado';
                this.fec_registro = this.category.fec_registro;
                this.formPersonal = this.formBuilder.group({
                    cat_cor_id  : [this.category.cat_cor_id],
                    cat_cor_name: [this.category.cat_cor_name],
                    cat_cor_desc: [this.category.cat_cor_desc],
                    usu_registro: [this.category.usu_registro],
                    num_cursos  : [this.category.num_cursos],
                    fec_registro: [this.category.fec_registro],
                    est_registro: [est_registro]
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
}
