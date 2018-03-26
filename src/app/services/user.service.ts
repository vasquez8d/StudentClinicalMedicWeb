import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';

@Injectable()
export class UserService {

    private headers: Headers;
    private userDetailsUrl = `${this.globalValues.urlAuthUser()}/details`;
    private localsUserToken = localStorage.getItem('tokenStudentClinicalAccessWS');
    private sessionUserTooen = sessionStorage.getItem('tokenStudentClinicalAccessWS');

    constructor(
        private http: Http,
        private globalValues: GlobalValues
    ) { }

    getUserDetails(user_id) {
        let credentials = '';

        if (this.localsUserToken != null) {
            credentials = this.localsUserToken;
        } else if (this.sessionUserTooen != null) {
            credentials = this.sessionUserTooen;
        }

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', credentials);
        return this.http.get
            (this.userDetailsUrl + '/' + user_id, { headers: this.headers })
            .map(res => {
                const result = res.json();
                return result;
            });
    }
}
