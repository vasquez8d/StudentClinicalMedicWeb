import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { CourseService } from '../../../../services/course.service';
import { CorcategoryService } from '../../../../services/corcategory.service';
import { UserService } from '../../../../services/user.service';
import { AuthloginService } from '../../../../services/authlogin.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Base64 } from 'js-base64';
import { MomentModule } from 'angular2-moment';
import { MatService } from '../../../../services/mat.service';
import { QuesService } from '../../../../services/questions.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
    selector: 'fuse-questions-upload',
    templateUrl: './questions-upload.component.html',
    styleUrls: ['./questions-upload.component.scss']
})
export class QuestionsUploadComponent implements OnInit {
    form: FormGroup;
    formErrors: any;
    viewdata = false;
    fileToUpload: File = null;
    courseFileName: any;
    form_valid = true;
    displayedColumns = ['ques_name', 'cat_cor_id', 'ques_question',
        'ques_res1', 'ques_res2', 'ques_res3',  'ques_res4', 'ques_res5', 'ques_ok'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private quesService: QuesService) {
    }
    ngOnInit() {
        
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    paymentSaveInfo() {

        Swal({
            title: 'Subir información al banco de preguntas',
            text: 'Las preguntas aparecerán en los exámenes.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.quesService.postUploadExcelFile(this.fileToUpload).subscribe(
                    sucess => {
                        if(sucess.res_service == 'ok'){
                            Swal({
                                title: 'La subida de información fue exitosa.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar',
                            });
                        }
                        this.dataSource = new MatTableDataSource(sucess.data_result);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                        this.viewdata = true;
                        this.form_valid = true;
                    }, err => {
                        Swal({
                            title: 'Error Carga de preguntas',
                            type: 'info',
                            text: err,
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                    }
                );
            }
        });
    }

    handleFileInput(event) {
        this.fileToUpload = <File>event.target.files[0];
        (<HTMLInputElement>document.getElementById('txtFileName')).value = this.fileToUpload.name;
        this.form_valid = false;
    }
}

export interface CourseData {
    ques_name: string;
    cat_cor_id: string;
    ques_question: string;
    ques_res1: string;
    ques_res2: string;
    ques_res3: string;
    ques_res4: string;
    ques_res5: string;
    ques_ok: string;
}
