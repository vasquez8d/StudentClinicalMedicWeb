import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { QuesService } from '../../../../services/questions.service';
import { Base64 } from 'js-base64';
import { QuestionsListDetailsDetComponent } from './dialog/details/questions-list-details-det.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-questions-list-details',
    styleUrls: ['./questions-list-details.component.scss'],
    templateUrl: './questions-list-details.component.html'
})

export class QuestionsListDetailsComponent implements OnInit {
    file_upload_name: any = '';
    data_id: any = '';
    displayedColumns = ['ques_id', 'ques_name', 'ques_question',
        'cat_cor_name', 'cab_est_registro', 'det_est_registro',  'options'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private momentModule: MomentModule,
        private quesService: QuesService,
        private activatedRouter: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.loadUploadDetailsList();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    loadUploadDetailsList(){
        this.activatedRouter.params.subscribe(params => {
            if (params.data_id) {
                const decode_data_id = Base64.decode(params.data_id);
                this.data_id = decode_data_id;
                this.quesService.getQuesUploadsDetailsList(decode_data_id).subscribe(
                    success => {
                        this.file_upload_name = success.data_result[0].data_file_name;
                        this.dataSource = new MatTableDataSource(success.data_result);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }, err => {
                        console.log('loadUploadDetailsList', err);
                    }
                );
            }
        });
    }

    uploadDetailsEnable(ques_id) {
        Swal({
            title: '¿Estas seguro de habilitar la pregunta?',
            text: 'La pregunta podrá ser vista en los exámenes',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.quesService.getUploadDetEnable(this.data_id, ques_id).subscribe(
                    success => {
                        Swal({
                            title: 'Pregunta habilitado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadUploadDetailsList();
                    }, err => {
                        Swal({
                            title: 'Error Pregunta habilitado',
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

    uploadDetailsDisable(ques_id) {
        Swal({
            title: '¿Estas seguro de deshabilitar la pregunta?',
            text: 'La pregunta no podrá ser vista en los exámenes.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.quesService.getUploadDetDisable(this.data_id, ques_id).subscribe(
                    success => {
                        Swal({
                            title: 'Pregunta deshabilitada',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadUploadDetailsList();
                    }, err => {
                        Swal({
                            title: 'Error Pregunta deshabilitada',
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

    backToUpload(){
        this.router.navigateByUrl('questions/list');
    }

    uploadDetailsDetails(ques_id) {
        const dialogRef = this.dialog.open(QuestionsListDetailsDetComponent, {
            data: {
                data_id: this.data_id,
                ques_id: ques_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadUploadDetailsList();
        });
    }
    
    uploadDetailsEdit(ques_id){

    }
}

export interface CourseData {
    ques_id: string;
    ques_name: string;
    ques_question: string;
    cab_est_registro: string;
    det_est_registro: string;
    options: string;
}
