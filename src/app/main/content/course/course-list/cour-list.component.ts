import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseListDetailsComponent } from './dialog/details/course-list.details.component';
import { CourseListUpdateComponent } from './dialog/update/course-list.update.component';
import { CourseService } from '../../../../services/course.service';
import { MomentModule } from 'angular2-moment';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-course-list',
    styleUrls: ['./cour-list.component.scss'],
    templateUrl: './cour-list.component.html'
})

export class CourListComponent implements OnInit {
    animal: string;
    name: string;

    UserListDetailsDialogRef: MatDialogRef<CourseListDetailsComponent>;

    displayedColumns = ['cor_id', 'cor_name', 'num_alumnos',
        'cat_cor_name', 'user_full_name', 'fec_registro', 'est_registro', 'options'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;

    constructor(
        private router: Router,
        private courseService: CourseService,
        public dialog: MatDialog,
        private momentModule: MomentModule
    ) {
    }

    ngOnInit() {
        this.loadCourseList();
        // this.loadGlobalUserDetials();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    navigateCreateCouse() {
        this.router.navigate(['course/create']);
    }

    loadCourseList() {
        this.courseService.getCourseList().subscribe(
            (res) => {
                this.dataSource = new MatTableDataSource(res.data_result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    courseDetails(cor_id) {
        const dialogRef = this.dialog.open(CourseListDetailsComponent, {
            data: {
                cor_id: cor_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    courseEdit(cor_id) {
        const dialogRef = this.dialog.open(CourseListUpdateComponent, {
            data: {
                cor_id: cor_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadCourseList();
        });
    }

    courseEnable(cor_id) {
        Swal({
            title: '¿Estas seguro de habilitar al curso?',
            text: 'El curso volverá a ser visto por los usuarios.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.courseService.getEnableCourse(cor_id).subscribe(
                    success => {
                        Swal({
                            title: 'Curso habilitado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadCourseList();
                    }, err => {
                        Swal({
                            title: 'Error Curso habilitado',
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

    courseDelete(cor_id) {
        Swal({
            title: '¿Estas seguro de deshabilitar al curso?',
            text: 'El curso no podrá ser visto por los usuarios.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.courseService.getDisableCourse(cor_id).subscribe(
                    success => {
                        Swal({
                            title: 'Curso deshabilitado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadCourseList();
                    }, err => {
                        Swal({
                            title: 'Error Curso deshabilitado',
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

    navigateNewCourse(){
        this.router.navigateByUrl('course/create');
    }
}

export interface CourseData {
    cor_id: string;
    cor_name: string;
    num_alumnos: string;
    cat_cor_name: string;
    user_full_name: string;
    fec_registro: string;
    est_registro: string;
    options: string;
}
