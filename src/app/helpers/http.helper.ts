import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpHelper {

    private headers: Headers;
    private headerHttpClient: HttpHeaders;
    private localsUserToken = localStorage.getItem('tokenStudentClinicalAccessWS');
    private sessionUserTooen = sessionStorage.getItem('tokenStudentClinicalAccessWS');

    constructor(
        private http: Http,
    ) { }

    getHeaderAuth() {
        let credentials = '';
        if (this.localsUserToken != null) {
            credentials = this.localsUserToken;
        } else if (this.sessionUserTooen != null) {
            credentials = this.sessionUserTooen;
        }
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', credentials);

        return this.headers;
    }

    getHeaderHttpClientAuth(){

        let credentials = '';
        if (this.localsUserToken != null) {
            credentials = this.localsUserToken;
        } else if (this.sessionUserTooen != null) {
            credentials = this.sessionUserTooen;
        }
        this.headerHttpClient = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.headerHttpClient = this.headerHttpClient.append('Authorization', credentials);
        
        return this.headerHttpClient;
    }

    getHeaderUploadFileAuth(){
        let credentials = '';
        if (this.localsUserToken != null) {
            credentials = this.localsUserToken;
        } else if (this.sessionUserTooen != null) {
            credentials = this.sessionUserTooen;
        }
        this.headers = new Headers({ 'Authorization': credentials });
        return this.headers;
    }
}
