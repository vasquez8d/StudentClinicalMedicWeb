import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import { CourseService } from '../../../../services/course.service';

@Component({
    selector: 'fuse-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CourseDetailsComponent implements OnInit {

    bIsUser = false;
    vCurrentUser: '';
    cor_name: any;

    constructor(private router: Router,
                private courseService: CourseService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadCourseDetails();
    }

    loadCourseDetails() {
        this.activatedRoute.params.subscribe(params => {
            if (params.cor_id) {
                const cor_id = Base64.decode(params.cor_id);
                this.courseService.getCourseDetails(cor_id).subscribe(
                    success => {
                        this.cor_name = success.data_result[0].cor_name;
                    },
                    error => {
                        console.log('error_loadCourseDetails', error);
                    }
                );
            }
        });
    }

    navigatePaymentCourse(){

    }
}
