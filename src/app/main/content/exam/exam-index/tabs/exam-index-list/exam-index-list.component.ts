import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';

import { CorcategoryService } from '../../../../../../services/corcategory.service';
import { ExamIndexListDetailsComponent } from './dialog/exam-index-list-details.component';
import { ExamIndexTypeComponent } from '../../dialog/exam-index-type/exam-index-type.component';
import { TestService } from '../../../../../../services/test.service';
import { AuthloginService } from '../../../../../../services/authlogin.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-exam-index-list',
    styleUrls: ['./exam-index-list.component.scss'],
    templateUrl: './exam-index-list.component.html'
})

export class ExamIndexListComponent implements OnInit {

    displayedColumns = ['test_id', 'cat_cor_name', 'test_num_ques',
        'test_time', 'test_result', 'test_fec_start', 'test_fec_finaliza', 'test_status', 'options'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private momentModule: MomentModule,
        private testService: TestService,
        private authloginService: AuthloginService
    ) {
    }

    ngOnInit() {
        this.loadTetstList();
    }

    loadTetstList(){
        this.authloginService.getTokenUserLoged().subscribe(
            success => {
                // tslint:disable-next-line:triple-equals
                if (success.res_service == 'ok'){
                    this.testService.getTestListxUser(success.data_result.user_id).subscribe(
                        successTest => {
                            // tslint:disable-next-line:triple-equals
                            if (successTest.res_service == 'ok'){

                                successTest.data_result.forEach(element => {
                                    element.test_fec_start = new Date(element.test_fec_start);
                                    element.test_fec_finaliza = new Date(element.test_fec_finaliza);
                                });

                                this.dataSource = new MatTableDataSource(successTest.data_result);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                            }

                        }, err => {
                            console.log(err);
                        }
                    );
                }else{
                    this.router.navigateByUrl('auth/login');
                }
            }, err => {
                console.log(err);
            }
        );
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    testDetails(test_id){
        const dialogRef = this.dialog.open(ExamIndexListDetailsComponent, {
            data: {
                test_id: test_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    selectExamType() {
        const dialogRef = this.dialog.open(ExamIndexTypeComponent, {
            data: {
                cor_id: 16
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}

export interface CourseData {
    test_id: string;
    cat_cor_name: string;
    test_num_ques: string;
    test_time: string;
    test_result: string;
    test_fec_start: string;
    test_fec_finaliza: string;
    test_status: string;
    options: string;
}
