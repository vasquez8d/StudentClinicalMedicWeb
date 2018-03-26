import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import * as crypto from 'crypto-js';
import { GlobalValues } from '../global/globalvalues';

@Injectable()
export class AuthloginService {

  private headers: Headers;
  
  private authUrl = `${this.globalValues.urlAuthUser()}/login`;
  private getAuthUrl = `${this.globalValues.urlAuthUser()}/userauth`;

  constructor(
    private http: Http,
    private globalValues: GlobalValues
  ) { }

  login(credentials, remember) {
    const pwEncrypt = crypto.AES.encrypt(credentials.user_pw.toString(), this.globalValues.cryptoKey());
    credentials.user_pw = pwEncrypt.toString();
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.authUrl, credentials, { headers: this.headers })
      .map(res => {
        const result = res.json();
        if (result.res_service === 'ok' ){
          if (remember){
            localStorage.setItem('tokenStudentClinicalAccessWS', result.token);
          }else{
            sessionStorage.setItem('tokenStudentClinicalAccessWS', result.token);
          }
        }
        return result;
      });
  }

  logout(){
    localStorage.removeItem('tokenStudentClinicalAccessWS');
    sessionStorage.removeItem('tokenStudentClinicalAccessWS');
    return true;
  }

  validateSession(){
    if (localStorage.getItem('tokenStudentClinicalAccessWS') === null) {
      return false;
    }else{
      return true;
    }
  }

  getTokenUser(credentials){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', credentials);
    return this.http
      .get(this.getAuthUrl, { headers: this.headers })
      .map(res => {
        const result = res.json();
        return result;
      });
  }
}
