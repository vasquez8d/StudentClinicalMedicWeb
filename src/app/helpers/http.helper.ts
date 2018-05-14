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

    getDropBoxUploadCorHeader(file_name){
        this.headers = new Headers({ 'Content-Type': 'application/octet-stream' });
        this.headers.append('Authorization', 'Bearer lGTusouv4ZAAAAAAAAAABTw4WXribOk3Gd8wq4Gbb4CgWfPPrqcdXyfILl1mojFc');
        this.headers.append('Dropbox-API-Arg', '{"path": "/Courses/' + file_name + '","mode": "add"}');
        return this.headers;
    }

    getDropBoxUploadClassHeader(file_name){
        this.headers = new Headers({ 'Content-Type': 'application/octet-stream' });
        this.headers.append('Authorization', 'Bearer lGTusouv4ZAAAAAAAAAABTw4WXribOk3Gd8wq4Gbb4CgWfPPrqcdXyfILl1mojFc');
        this.headers.append('Dropbox-API-Arg', '{"path": "/Clases/' + file_name + '","mode": "add"}');
        return this.headers;
    }

    getDropBoxUploadVoucherHeader(file_name){
        this.headers = new Headers({ 'Content-Type': 'application/octet-stream' });
        this.headers.append('Authorization', 'Bearer lGTusouv4ZAAAAAAAAAABTw4WXribOk3Gd8wq4Gbb4CgWfPPrqcdXyfILl1mojFc');
        this.headers.append('Dropbox-API-Arg', '{"path": "/Vouchers/' + file_name + '","mode": "add"}');
        return this.headers;
    }

    getDropBoxDeleteHeader(){
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', 'Bearer lGTusouv4ZAAAAAAAAAAXtiDmqsUuHj3n2RzkO9-zC5TGD6UZdYa6jwffIOcnGzP');
        return this.headers;
    }

    getDropBoxSharedHeader(){
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', 'Bearer lGTusouv4ZAAAAAAAAAAEVKyy6USKzuaVw8nUlL-WcZmNS0ZyJTr4Fz3EpjI2w_v');
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
