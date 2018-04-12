import { Component, ViewChild, OnInit, Inject  } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { GlobalUser } from '../../../../global/globaluser';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { UserListDetailsComponent } from './dialogs/details/user-list.details.component';
import { UserListUpdateComponent } from './dialogs/update/user-list.update.component';
import { UserListRoleComponent } from './dialogs/role/user-list.role.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'fuse-user-list',
    styleUrls: ['./user-list.component.scss'],
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
    animal: string;
    name: string;
    
    UserListDetailsDialogRef: MatDialogRef<UserListDetailsComponent>;

    displayedColumns = ['user_id', 'user_full_name', 'user_mail', 
                        'rol_name', 'est_registro', 'options'];
    dataSource: MatTableDataSource<UserData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    userData: any;
    
    constructor(
        private router: Router,
        private globalUser: GlobalUser,
        private userService: UserService,
        public dialog: MatDialog
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
        const dialogRef = this.dialog.open(UserListDetailsComponent, {
            data: {
                user_id: user_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    userEdit(user_id){
        const dialogRef = this.dialog.open(UserListUpdateComponent, {
            data: {
                user_id: user_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadUsersList();
        });
    }

    userEdirRole(user_id){
        const dialogRef = this.dialog.open(UserListRoleComponent, {
            data: {
                user_id: user_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadUsersList();
        });
    }

    userEnable(user_id){
        Swal({
            title: '¿Estas seguro de habilitar al usuario?',
            text: 'El usuario podrá volver a ingresar al sistema.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.userService.getEnableUser(user_id).subscribe(
                    success => {
                        Swal({
                            title: 'Usuario habilitado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadUsersList();
                    }, err => {
                        Swal({
                            title: 'Error Usuario habilitado',
                            type: 'info',
                            text: err,
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                    }
                )
            }
        });
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
                this.userService.getDisableUser(user_id).subscribe(
                    success => {
                        Swal({
                            title: 'Usuario deshabilitado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.loadUsersList();
                    }, err => {
                        Swal({
                            title: 'Error Usuario deshabilitado',
                            type: 'info',
                            text: err,
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                    }
                )
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
