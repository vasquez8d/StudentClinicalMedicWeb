import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class TestService {

    private TestCreateUrl = `${this.globalValues.urlTest()}/create`;

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    postCreateTest(data) {
        return this.http
            .post(this.TestCreateUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }
}
