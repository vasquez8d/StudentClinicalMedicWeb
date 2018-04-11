import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { GlobalUser } from '../../../../global/globaluser';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-user-list',
    styleUrls: ['./user-list.component.scss'],
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
    displayedColumns = ['user_id', 'user_full_name', 'user_mail', 
                        'rol_name', 'est_registro', 'options'];
    dataSource: MatTableDataSource<UserData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;
    
    constructor(
        private router: Router,
        private globalUser: GlobalUser,
        private userService: UserService
    ) {   
    }
    
    ngOnInit(){
        this.loadUsersList();
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

    loadGlobalUserDetials() {
        this.userService.getGlobalUserDetails().subscribe(
            successGlobalDetails => {
                this.userData = successGlobalDetails;
            },
            error => {
                console.log(error);
            }
        );
    }

    loadUsersList(){
        this.userService.getUsersList().subscribe(
            (res) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    userDetails(user_id){
        alert('userDetails' + user_id);
    }
    userEdit(user_id){
        alert('userEdit' + user_id);
    }
    userDelete(user_id){
        Swal({
            title: '¿Estas seguro de deshabilitar al usuario?',
            text: 'El usuario no podrá ingresar al sistema.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                Swal({
                    title: 'Usuario deshabilitado',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar',
                });
            }
        });
    }
}

export interface UserData {
    user_id: string;
    user_full_name: string;
    user_mail: string;
    rol_name: string;
    est_registro: string;
    options: string;
}
