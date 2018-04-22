import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseService } from '../../../../services/course.service';
import { MomentModule } from 'angular2-moment';
import { Base64 } from 'js-base64';
import { PaymentListDetailsComponent } from './dialog/payment-list-dialog.component';
import { MatService } from '../../../../services/mat.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-payment-list',
    styleUrls: ['./payment-list.component.scss'],
    templateUrl: './payment-list.component.html'
})

export class PaymentListComponent implements OnInit {

    UserListDetailsDialogRef: MatDialogRef<PaymentListDetailsComponent>;

    displayedColumns = ['mat_id', 'usu_full_name', 'cor_name', 'cor_price',
        'cat_cor_name', 'fec_registro', 'mat_state', 'options'];

    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private matService: MatService,
        private momentModule: MomentModule
    ) {
    }

    ngOnInit() {
        this.loadMatList();
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

    loadMatList(){
        this.matService.getMatList().subscribe(
            success => {
                this.dataSource = new MatTableDataSource(success.data_result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, err => {
                console.log(err);
            }
        );
    }

    paymentDetails(mat_id){
        const dialogRef = this.dialog.open(PaymentListDetailsComponent, {
            data: {
                mat_id: mat_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadMatList();
        });
    }
    
}

export interface CourseData {
    mat_id: string;
    usu_full_name: string;
    cor_name: string;
    cor_price: string;
    cat_cor_name: string;
    fec_registro: string;
    mat_state: string;
    options: string;
}
