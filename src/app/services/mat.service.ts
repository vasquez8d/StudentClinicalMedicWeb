import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class MatService {

    private MatListlUrl         = `${this.globalValues.urlMat()}/list`;
    private MatDetailsUrl       = `${this.globalValues.urlMat()}/details`;
    private MatCreateUrl        = `${this.globalValues.urlMat()}/create`;
    private MatCreateFreeUrl    = `${this.globalValues.urlMat()}/createfree`;
    private MatApprobeUrl       = `${this.globalValues.urlMat()}/approve`;
    private MatDisaapprobeUrl   = `${this.globalValues.urlMat()}/disapprove`;
    private MatUploadImageUrl   = `${this.globalValues.urlMat()}/uploadimage`;

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    getMatList() {
        try {
            return this.http.get
                (this.MatListlUrl, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getUsersList', err);
        }
    }

    postMatRegister(mat) {
        return this.http
            .post(this.MatCreateUrl, mat, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    postMatRegisterFree(mat){
        return this.http
            .post(this.MatCreateUrl, mat, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getMatDetails(mat_id) {
        try {
            return this.http.get
                (this.MatDetailsUrl + '/' + mat_id , { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getCourseDetails', err);
        }
    }

    getApprobe(mat_id) {
        try {
            return this.http.get
                (this.MatApprobeUrl + '/' + mat_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getApprobe', err);
        }
    }

    getDisapprobe(mat_id) {
        try {
            return this.http.get
                (this.MatDisaapprobeUrl + '/' + mat_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getDisapprobe', err);
        }
    }

    postUploadVoucherImage(file) {
        const fd = new FormData();
        try {
            fd.append('image', file, file.name);
        } catch (err) {
            console.log(err);
        }
        return this.http
            .post(this.MatUploadImageUrl, fd, { headers: this.httpHelper.getHeaderUploadFileAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }
}
