import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Base64 } from 'js-base64';
import { HttpHelper } from '../../../../../helpers/http.helper';
import { GlobalValues } from '../../../../../global/globalvalues';
import { AuthloginService } from '../../../../../services/authlogin.service';

@Injectable()
export class ProjectCoursesIndexService implements Resolve<any>
{
    onCategoriesChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onCoursesChanged: BehaviorSubject<any> = new BehaviorSubject({});

    private CorCategoryListlUrl = `${this.globalValues.urlCorcategory()}/list`;
    private CourseListlUrl = `${this.globalValues.urlCourse()}/listxuser/`;

    constructor(private http: HttpClient,
                private httpHelper: HttpHelper,
                private globalValues: GlobalValues)
    {
    }

    /**
     * The Academy App Main Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCategories(),
                this.getCourses()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCategories(): Promise<any>
    {        
        return new Promise((resolve, reject) => {
            this.http.get(this.CorCategoryListlUrl, { headers: this.httpHelper.getHeaderHttpClientAuth() })
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    getCourses(): Promise<any>
    {   
        const decode_user_id = 41;
        return new Promise((resolve, reject) => {
            this.http.get(this.CourseListlUrl + decode_user_id, { headers: this.httpHelper.getHeaderHttpClientAuth() })
                .subscribe((response: any) => {
                    this.onCoursesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
