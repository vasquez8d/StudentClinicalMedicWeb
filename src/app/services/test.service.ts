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

    getDate() {
    const date = new Date(),
        year = date.getFullYear(),
        month = (date.getMonth() + 1).toString(),
        formatedMonth = (month.length === 1) ? ('0' + month) : month,
        day = date.getDate().toString(),
        formatedDay = (day.length === 1) ? ('0' + day) : day,
        hour = date.getHours().toString(),
        formatedHour = (hour.length === 1) ? ('0' + hour) : hour,
        minute = date.getMinutes().toString(),
        formatedMinute = (minute.length === 1) ? ('0' + minute) : minute,
        second = date.getSeconds().toString(),
        formatedSecond = (second.length === 1) ? ('0' + second) : second;
    return formatedDay + '/' + formatedMonth + '/' + year + ' ' + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
    }
}
