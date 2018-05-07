import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CourseService } from '../../../../services/course.service';
import { MomentModule } from 'angular2-moment';

import { CategoryListDetailsComponent } from './dialog/details/category-list-details.component';
import { CategoryListUpdateComponent } from './dialog/update/category-list-update.component';
import { CategoryListCreateComponent } from './dialog/create/category-list-create.component';
import { CorcategoryService } from '../../../../services/corcategory.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-category-list',
    styleUrls: ['./category-list.component.scss'],
    templateUrl: './category-list.component.html'
})

export class CategoryListComponent implements OnInit {
    animal: string;
    name: string;

    UserListDetailsDialogRef: MatDialogRef<CategoryListDetailsComponent>;

    displayedColumns = ['cat_cor_id', 'cat_cor_name', 'num_cursos',
                        'fec_registro', 'est_registro', 'options'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;

    constructor(
        private router: Router,
        private categoryService: CorcategoryService,
        public dialog: MatDialog,
        private momentModule: MomentModule
    ) {
    }

    ngOnInit() {
        this.loadCategoryList();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    loadCategoryList() {
        this.categoryService.getCategoryList().subscribe(
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

    categoryDetails(cat_cor_id) {
        const dialogRef = this.dialog.open(CategoryListDetailsComponent, {
            data: {
                cat_cor_id: cat_cor_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    categoryEdit(cat_cor_id) {
        const dialogRef = this.dialog.open(CategoryListUpdateComponent, {
            data: {
                cat_cor_id: cat_cor_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadCategoryList();
        });
    }

    categoryCreate() {
        const dialogRef = this.dialog.open(CategoryListCreateComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.loadCategoryList();
        });
    }

    categoryEnable(cat_cor_id) {
        Swal({
            title: '¿Estas seguro de habilitar la categoría?',
            text: 'La categoría volverá a ver vista en el registro de cursos.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.categoryService.getEnableCategory(cat_cor_id).subscribe(
                    success => {
                        Swal({
                            title: 'Categoría habilitado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadCategoryList();
                    }, err => {
                        Swal({
                            title: 'Error Categoría habilitado',
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

    categoryDelete(cat_cor_id) {
        Swal({
            title: '¿Estas seguro de deshabilitar la categoría?',
            text: 'La categoría no podrá ser vista en el registro de cursos.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.categoryService.getDisableCategory(cat_cor_id).subscribe(
                    success => {
                        Swal({
                            title: 'Categoría deshabilitada',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadCategoryList();
                    }, err => {
                        Swal({
                            title: 'Error Categoría deshabilitada',
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
    cat_cor_id: string;
    cat_cor_name: string;
    num_cursos: string;
    fec_registro: string;
    est_registro: string;
    options: string;
}
