import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { GlobalUser } from '../global/globaluser';
import { AuthloginService } from './authlogin.service';
import { Router } from '@angular/router';
import { UserListComponent } from '../main/content/user/list/user-list.component';

@Injectable()
export class UserService {

    private headers: Headers;
    private userDetailsUrl = `${this.globalValues.urlAuthUser()}/details`;
    private userUpdateUrl = `${this.globalValues.urlAuthUser()}/update`;
    private localsUserToken = localStorage.getItem('tokenStudentClinicalAccessWS');
    private sessionUserTooen = sessionStorage.getItem('tokenStudentClinicalAccessWS');
    
    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private globalUser: GlobalUser,
        private authloginService: AuthloginService,
        private router: Router
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

        try{
            return this.http.get
                (this.userDetailsUrl + '/' + user_id, { headers: this.headers })
                .map(res => {
                    const result = res.json();
                    console.log(result);
                    return result;
                });
        }catch (err){
            console.log('error_getUserDetails', err);
        }
    }

    getGlobalUserDetails(){

        console.log('getGlobalUserDetails');

        const localsUserToken = localStorage.getItem('tokenStudentClinicalAccessWS');
        const sessionUserTooen = sessionStorage.getItem('tokenStudentClinicalAccessWS');
        
        console.log(sessionUserTooen);

        if (localsUserToken != null) {
            console.log('1');
            if (this.globalUser.user == null) {
                console.log('2');
                try{
                    this.authloginService.getTokenUser(localsUserToken).subscribe(
                        success => {
                            if (success.res_service === 'ok') {
                                this.globalUser.user = success.data_result;
                                return this.getUserDetails(this.globalUser.user.user_id);
                            } else {
                                this.router.navigateByUrl('/auth/login');
                            }
                        },
                        error => {
                            console.log('error_getGlobalUserDetails3', error);
                        }
                    );
                } catch (err){
                    console.log('error_getGlobalUserDetails2', err);
                }

            } else {
               console.log('3');
               console.log(this.globalUser.user);
               return this.getUserDetails(this.globalUser.user.user_id);
            }
        } else if (sessionUserTooen != null) {
            if (this.globalUser.user == null) {
                this.authloginService.getTokenUser(sessionUserTooen).subscribe(
                    success => {
                        if (success.res_service === 'ok') {
                            this.globalUser.user = success.data_result;
                            return this.getUserDetails(this.globalUser.user.user_id);
                        } else {
                            this.router.navigateByUrl('/auth/login');
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            } else {
                console.log('3');
                return this.getUserDetails(this.globalUser.user.user_id);
            }
        }
    }

    postUpdateUserInfo(user) {
        let credentials = '';

        if (this.localsUserToken != null) {
            credentials = this.localsUserToken;
        } else if (this.sessionUserTooen != null) {
            credentials = this.sessionUserTooen;
        }

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', credentials);

        return this.http
            .post(this.userUpdateUrl, user, { headers: this.headers })
            .map(res => {
                const result = res.json();
                console.log(result);
                return result;
            });
    }
}
