import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHelper } from '../../../../helpers/http.helper';
import { GlobalValues } from '../../../../global/globalvalues';
import { Base64 } from 'js-base64';

@Injectable()
export class CourseIndexService implements Resolve<any>
{
    onCourseChanged: BehaviorSubject<any> = new BehaviorSubject({});

    private CourseClassListlUrl = `${this.globalValues.urlClass()}/listxcoursestart`;

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
                this.getCourse(route.params.cor_id)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCourse(cor_id): Promise<any>
    {
        const decode_cor_id = Base64.decode(cor_id);
        return new Promise((resolve, reject) => {
            this.http.get(this.CourseClassListlUrl + '/' + decode_cor_id, { headers: this.httpHelper.getHeaderHttpClientAuth() })
                .subscribe((response: any) => {
                    this.onCourseChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
