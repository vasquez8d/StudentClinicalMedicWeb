import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class CorcategoryService {

    private CorCategoryListlUrl       = `${this.globalValues.urlCorcategory()}/list`;
    private CorCategoryListAdvanceUrl = `${this.globalValues.urlCorcategory()}/listadvance`;
    private CorCategoryRegisterUrl    = `${this.globalValues.urlCorcategory()}/create`;
    private CorCategoryDetailsUrl     = `${this.globalValues.urlCorcategory()}/details`;
    private CorCategoryUpdateUrl      = `${this.globalValues.urlCorcategory()}/update`;
    private CorCategoryDisableUrl     = `${this.globalValues.urlCorcategory()}/delete`;
    private CorCategoryEnableUrl      = `${this.globalValues.urlCorcategory()}/enable`;

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    getCorCategoryList() {
        try {
            return this.http.get
                (this.CorCategoryListlUrl, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getUsersList', err);
        }
    }

    getCategoryList(){
        try {
            return this.http.get
                (this.CorCategoryListAdvanceUrl, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getUsersList', err);
        }
    }

    postCategoryRegister(data) {
        return this.http
            .post(this.CorCategoryRegisterUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getCategoryDetails(cat_cor_id){
        return this.http.get
            (this.CorCategoryDetailsUrl + '/' + cat_cor_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    postCategoryUpdate(category){
        return this.http
            .post(this.CorCategoryUpdateUrl, category, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getEnableCategory(cat_cor_id){
        return this.http.get
            (this.CorCategoryEnableUrl + '/' + cat_cor_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getDisableCategory(cat_cor_id){
        return this.http.get
            (this.CorCategoryDisableUrl + '/' + cat_cor_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }
}
