import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import * as crypto from 'crypto-js';
import { GlobalUser } from '../global/globaluser';
import { GlobalValues } from '../global/globalvalues';

@Injectable()
export class AuthregisterService {

    private headers: Headers;
    private regUrlwo = `${this.globalValues.urlAuthUser()}/createwo`;
    private validateEmailUrl = `${this.globalValues.urlValidateMail()}/gencode`;

    constructor(
        private http: Http,
        private globalUser: GlobalUser,
        private globalValues: GlobalValues
    ) { }

    registerwo(credentials) {

        const pwEncrypt = crypto.AES.encrypt(credentials.user_pw.toString(), this.globalValues.cryptoKey());
        credentials.user_pw = pwEncrypt.toString();
        credentials.rol_id = 3;
        credentials.usu_registro = 'web';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        
        return this.http
            .post(this.regUrlwo, credentials, { headers: this.headers })
            .map(res => {
                const result = res.json();      
                console.log(result);          
                if (result.res_service === 'ok'){
                    localStorage.setItem('tokenStudentClinicalAccessWS', result.token);
                    this.globalUser.user = result.data_result;
                }
                return result;
            });
    }

    generateCodeValidateMail(email){
        this.validateEmailUrl = this.validateEmailUrl + '/' + email;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
          .get(this.validateEmailUrl, { headers: this.headers })
          .map(res => {
            const result = res.json();
            return result;
          });
    }
}
