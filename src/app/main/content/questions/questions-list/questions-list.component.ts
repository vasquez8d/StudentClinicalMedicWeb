import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { QuesService } from '../../../../services/questions.service';
import { Base64 } from 'js-base64';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-questions-list',
    styleUrls: ['./questions-list.component.scss'],
    templateUrl: './questions-list.component.html'
})

export class QuestionsListComponent implements OnInit {
    animal: string;
    name: string;

    displayedColumns = ['data_id', 'data_file_name', 'data_rows',
        'fec_registro', 'est_registro', 'options'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;

    constructor(
        private router: Router,
        private momentModule: MomentModule,
        private quesService: QuesService
    ) {
    }

    ngOnInit() {
        this.loadQuesUploadsList();
    }

    loadQuesUploadsList(){
        this.quesService.getQuesUploadsList().subscribe(
            success => {
                this.dataSource = new MatTableDataSource(success.data_result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, err => {
                console.log('loadQuesUploadsList', err);
            }
        );
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    uploadDetails(data_id){
        const encryptData = Base64.encode(data_id.toString());
        this.router.navigate(['questions/' + encryptData + '/' + '/details']);
    }

    uploadEnable(data_id) {
        Swal({
            title: '¿Estas seguro de habilitar la carga de preguntas?',
            text: 'Las preguntas que pertenecen a esta carga podrán ser vistas en los exámenes.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.quesService.getUploadEnable(data_id).subscribe(
                    success => {
                        Swal({
                            title: 'Carga de preguntas habilitado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadQuesUploadsList();
                    }, err => {
                        Swal({
                            title: 'Error Carga de preguntas habilitado',
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
    
    questionsUpload(){
        this.router.navigateByUrl('questions/upload');
    }

    uploadDisabled(data_id) {
        Swal({
            title: '¿Estas seguro de deshabilitar la carga de preguntas?',
            text: 'Las preguntas cargadas no podrán ser vistas en los exámenes.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.quesService.getUploadDisable(data_id).subscribe(
                    success => {
                        Swal({
                            title: 'Carga de preguntas deshabilitada',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadQuesUploadsList();
                    }, err => {
                        Swal({
                            title: 'Error Carga de preguntas deshabilitada',
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

    navigateNewCourse() {
        this.router.navigateByUrl('course/create');
    }
}

export interface CourseData {
    data_id: string;
    data_file_name: string;
    data_rows: string;
    fec_registro: string;
    est_registro: string;
    options: string;
}
