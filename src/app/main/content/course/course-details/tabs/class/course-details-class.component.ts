import { Component, OnInit, ViewChild } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../../../../services/class.service';
import { CourseService } from '../../../../../../services/course.service';
import { MomentModule } from 'angular2-moment';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Base64 } from 'js-base64';

@Component({
    selector   : 'fuse-course-details-class',
    templateUrl: './course-details-class.component.html',
    styleUrls  : ['./course-details-class.component.scss'],
    animations : fuseAnimations
})
export class CourseDetailsClassComponent implements OnInit
{
    displayedColumns = ['class_tittle', 'class_time',
        'cor_name', 'fec_registro'];
    dataSource: MatTableDataSource<CourseData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private activateRouter: ActivatedRoute,
        private classService: ClassService,
        private courseService: CourseService,
        private momentModule: MomentModule
    ) {
    }

    ngOnInit() {
        this.loadClassList();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    loadClassList() {
        this.activateRouter.params.subscribe(params => {
            if (params.cor_id) {
                const decode_code_id = Base64.decode(params.cor_id);
                this.classService.getClassEnableList(decode_code_id).subscribe(
                    (res) => {
                        if (res.data_result.length > 0 ){
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

export interface CourseData {
    class_tittle: string;
    class_time: string;
    cor_name: string;
    fec_registro: string;
}
