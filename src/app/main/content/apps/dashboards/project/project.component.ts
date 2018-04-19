import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from './project.service';
import { GlobalUser } from '../../../../../global/globaluser';
import { MomentModule } from 'angular2-moment';

import { WeatherSettings, 
         TemperatureScale, 
         ForecastMode, 
         WeatherLayout } from 'angular-weather-widget';
import { ProjectCoursesIndexService } from './project-courses.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector     : 'fuse-project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class FuseProjectDashboardComponent implements OnInit, OnDestroy
{
    settings: WeatherSettings;

    user = {
        user_seg_nom: '',
        user_pri_nom: ''
    };
    
    categories: any[];
    courses: any[];
    coursesFilteredByCategory: any[];
    filteredCourses: any[];

    categoriesSubscription: Subscription;
    coursesSubscription: Subscription;

    currentCategory = 'all';
    searchTerm = '';

    dateNow = Date.now();

    constructor(private coursesService: ProjectCoursesIndexService,
                private globalUser: GlobalUser,
                private momentModule: MomentModule
            )
    {
        // this.widgetsAna = this.analyticsDashboardService.widgets;
        if (this.globalUser.user != null){
            this.user = this.globalUser.user;
        }
        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);
    }

    ngOnInit()
    {
        this.loadCurrentWeather();
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
                    console.log(courses);
                    this.filteredCourses = this.coursesFilteredByCategory = this.courses = courses.data_result;
                });
    }
    formatNumber(number){
        return Math.round(number);
    }
    ngOnDestroy() {
        this.categoriesSubscription.unsubscribe();
        this.coursesSubscription.unsubscribe();
    }

    filterCoursesByCategory() {
        // Filter
        if (this.currentCategory === 'all') {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                return course.cat_cor_id === this.currentCategory;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    filterCoursesByTerm() {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredCourses = this.coursesFilteredByCategory;
        }
        else {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.cor_name.toLowerCase().includes(searchTerm);
            });
        }
    }
    
    loadCurrentWeather(){        
        this.settings = {
            location: {
                cityName: 'Chancay'
            },
            backgroundColor: '#fafafa',
            color: '#000000',
            width: 'auto',
            height: 'auto',
            showWind: false,
            scale: TemperatureScale.CELCIUS,
            forecastMode: ForecastMode.DETAILED,
            showDetails: false,
            showForecast: false,
            layout: WeatherLayout.WIDE,
            language: 'es'
        };
    }
}
