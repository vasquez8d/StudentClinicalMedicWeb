import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class TestService {
    private TestCreateUrl = `${this.globalValues.urlTest()}/create`;
    private TestQuestions = `${this.globalValues.urlTest()}/test`;
    private TestFinalizeUrl = `${this.globalValues.urlTest()}/finalize`;
    private TestStatusUrl = `${this.globalValues.urlTest()}/status`;
    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    postCreateTest(data) {
        return this.http
            .post(this.TestCreateUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                return res.json();
            });
    }

    getTestStatus(test_id) {
        console.log(test_id);
        return this.http.get
            (this.TestStatusUrl + '/' + test_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    postTestQuestions(data){
        return this.http
            .post(this.TestQuestions, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                return res.json();
            });
    }

    postFinalizeTest(data) {
        return this.http
            .post(this.TestFinalizeUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                return res.json();
            });
    }
}
