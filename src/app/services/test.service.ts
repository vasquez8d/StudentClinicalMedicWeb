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
    private TestListUrl = `${this.globalValues.urlTest()}/listxuser`;
    private TestDetailsUrl = `${this.globalValues.urlTest()}/details`;

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

    getTestDetails(test_id){
        return this.http.get
            (this.TestDetailsUrl + '/' + test_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                return res.json();
            });
    }

    getTestStatus(test_id) {
        return this.http.get
            (this.TestStatusUrl + '/' + test_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                return res.json();
            });
    }

    getTestListxUser(user_id) {
        return this.http.get
            (this.TestListUrl + '/' + user_id, { headers: this.httpHelper.getHeaderAuth() })
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
