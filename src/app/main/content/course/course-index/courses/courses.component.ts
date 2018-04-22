import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CoursesIndexService } from '../courses.service';
import { MomentModule } from 'angular2-moment';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';

@Component({
    selector   : 'fuse-academy-courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss']
})
export class CoursesIndexComponent implements OnInit, OnDestroy
{
    categories: any[];
    courses: any[];
    coursesFilteredByCategory: any[];
    filteredCourses: any[];

    categoriesSubscription: Subscription;
    coursesSubscription: Subscription;

    currentCategory = 'all';
    searchTerm = '';

    constructor(
        private coursesService: CoursesIndexService,
        private momentModule: MomentModule,
        private router: Router
    )
    {
    }

    ngOnInit()
    {
        // Subscribe to categories
        this.categoriesSubscription =
            this.coursesService.onCategoriesChanged
                .subscribe(categories => {
                    this.categories = categories.data_result;
                });

        // Subscribe to courses
        this.coursesSubscription =
            this.coursesService.onCoursesChanged
                .subscribe(courses => {
                    this.filteredCourses = this.coursesFilteredByCategory = this.courses = courses.data_result;
                });
    }

    ngOnDestroy()
    {
        this.categoriesSubscription.unsubscribe();
        this.coursesSubscription.unsubscribe();
    }

    filterCoursesByCategory()
    {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else
        {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                return course.cat_cor_id === this.currentCategory;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    filterCoursesByTerm()
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredCourses = this.coursesFilteredByCategory;
        }
        else
        {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.cor_name.toLowerCase().includes(searchTerm);
            });
        }
    }

    navigateToClass(cor_id, cor_slug){
        const encryptCourse = Base64.encode(cor_id.toString());
        this.router.navigate(['course/' + encryptCourse + '/' + cor_slug + '/start']);
    }
}
