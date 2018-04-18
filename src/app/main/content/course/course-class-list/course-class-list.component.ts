import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { CourseClassListDetailsComponent } from './dialog/details/course-class-list-details.component';
import { CourseClassListUpdateComponent } from './dialog/update/course-class-list-update.component';
import { Base64 } from 'js-base64';
import { ClassService } from '../../../../services/class.service';
import { CourseService } from '../../../../services/course.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-course-class-list',
    styleUrls: ['./course-class-list.component.scss'],
    templateUrl: './course-class-list.component.html'
})

export class CourseClassListComponent implements OnInit {

    UserListDetailsDialogRef: MatDialogRef<CourseClassListDetailsComponent>;
    displayedColumns = ['class_id', 'class_tittle', 'class_time',
        'cor_name', 'fec_registro', 'est_registro', 'options'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;
    courseName: any;
    constructor(
        private router: Router,
        private activateRouter: ActivatedRoute,
        private classService: ClassService,
        private courseService: CourseService,
        public dialog: MatDialog,
        private momentModule: MomentModule
    ) {
    }

    ngOnInit() {
        this.loadClassList();
        this.loadCourseName();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    navigateNewClass() {
        this.activateRouter.params.subscribe(params => {
            if (params.cor_id) {
                this.router.navigate(['course/class/' + params.cor_id + '/create']);
            }
        });
    }
    
    navigateReturnCourse(){
        this.router.navigate(['course/list']);
    }

    loadCourseName(){
        this.activateRouter.params.subscribe(params => {
            if (params.cor_id) {
                var decode_code_id = Base64.decode(params.cor_id);
                this.courseService.getCourseDetails(decode_code_id).subscribe(
                    success => {
                        this.courseName = success.data_result[0].cor_name;
                    }, err => {
                        console.log(err);
                    }
                );
            }
        });
    }

    loadClassList() {
        this.activateRouter.params.subscribe(params => {
            if (params.cor_id) {
                var decode_code_id = Base64.decode(params.cor_id);
                this.classService.getClassList(decode_code_id).subscribe(
                    (res) => {
                        if(res.data_result.length > 0 ){
                            this.dataSource = new MatTableDataSource(res.data_result);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        });

    }

    classDetails(class_id) {
        const dialogRef = this.dialog.open(CourseClassListDetailsComponent, {
            data: {
                class_id: class_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    classEdit(class_id) {
        const dialogRef = this.dialog.open(CourseClassListUpdateComponent, {
            data: {
                class_id: class_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadClassList();
        });
    }
    classEnable(class_id) {
        Swal({
            title: '¿Estas seguro de habilitar la clase?',
            text: 'La clase volverá a ser vista por los usuarios.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.classService.getEnableClass(class_id).subscribe(
                    success => {
                        Swal({
                            title: 'Clase habilitada',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadClassList();
                    }, err => {
                        Swal({
                            title: 'Error Clase habilitado',
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

    classDelete(class_id) {
        Swal({
            title: '¿Estas seguro de deshabilitar la clase?',
            text: 'La clase no podrá ser vista por los usuarios.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.classService.getDisableClass(class_id).subscribe(
                    success => {
                        Swal({
                            title: 'Clase deshabilitada',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadClassList();
                    }, err => {
                        Swal({
                            title: 'Error Clase deshabilitado',
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
    class_id: string;
    class_tittle: string;
    class_time: string;
    cor_name: string;
    fec_registro: string;
    est_registro: string;
    options: string;
}
