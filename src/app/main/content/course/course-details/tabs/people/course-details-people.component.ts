import { Component, OnInit, ViewChild } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { CourseService } from '../../../../../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { GlobalUser } from '../../../../../../global/globaluser';
import { UserService } from '../../../../../../services/user.service';
import { MomentModule } from 'angular2-moment';

@Component({
    selector   : 'fuse-course-details-people',
    templateUrl: './course-details-people.component.html',
    styleUrls: ['./course-details-people.component.scss'],
    animations : fuseAnimations
})
export class CouseDetailsPeopleComponent implements OnInit {
    displayedColumns = ['user_reg_provider_photo', 'user_full_name', 'user_ubigeo', 
                        'cor_name', 'fec_registro'];
    dataSource: MatTableDataSource<UserData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private courserService: CourseService,
        private activatedRoute: ActivatedRoute,
        private globalUser: GlobalUser,
        private userService: UserService
    ) {   
    }
    
    ngOnInit(){
        this.loadUsersList();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    loadUsersList(){
        this.activatedRoute.params.subscribe(params => {
            if (params.cor_id) {
                const cor_id = Base64.decode(params.cor_id);
                this.courserService.getUsersListCourse(cor_id).subscribe(
                    (res) => {
                        if(res.data_result.length >0 )
                        {
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
}

export interface UserData {
    user_reg_provider_photo: string;
    user_full_name: string;
    user_ubigeo: string;
    cor_name: string;
    fec_registro: string;
}
