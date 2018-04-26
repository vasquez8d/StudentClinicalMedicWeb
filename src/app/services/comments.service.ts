import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class CommentsService {

    private CommentCreateUrl = `${this.globalValues.urlComments()}/create`;

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    postCategoryRegister(data) {
        console.log(data);
        return this.http
            .post(this.CommentCreateUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }
}
