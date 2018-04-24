import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class QuesService {

    private QuesListlUrl            = `${this.globalValues.urlQuestions()}/listuploads`;
    private QuesListDetailsUrl      = `${this.globalValues.urlQuestions()}/listuploadsdetails`;
    private QuesUploadDisableUrl    = `${this.globalValues.urlQuestions()}/disableupload`;
    private QuesUploadEnableUrl     = `${this.globalValues.urlQuestions()}/enableupload`;
    private QuesUploadDetDisableUrl = `${this.globalValues.urlQuestions()}/disableuploaddet`;
    private QuesUploadDetEnableUrl  = `${this.globalValues.urlQuestions()}/enableuploaddet`;
    private QuesDetailsDetUrl       = `${this.globalValues.urlQuestions()}/uploaddetails`;
    private QuesUpdateInfoUrl       = `${this.globalValues.urlQuestions()}/update`;
    private QuesUploadExcelUrl       = `${this.globalValues.urlQuestions()}/upload`;

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    getQuesUploadsList() {
        try {
            return this.http.get
                (this.QuesListlUrl, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getQuesUploadsList', err);
        }
    }

    postUpdateQuestion(data){
        return this.http
            .post(this.QuesUpdateInfoUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getQuesUploadsDetailsList(data_id) {
        try {
            return this.http.get
                (this.QuesListDetailsUrl + '/' + data_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getQuesUploadsDetailsList', err);
        }
    }

    getQueUploadDetails(data_id, ques_id){
        try {
            return this.http.get
                (this.QuesDetailsDetUrl + '/' + data_id + '/' + ques_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getQueUploadDetails', err);
        }
    }

    getUploadDisable(data_id) {
        try {
            return this.http.get
                (this.QuesUploadDisableUrl + '/' + data_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getApprobe', err);
        }
    }

    getUploadEnable(data_id) {
        try {
            return this.http.get
                (this.QuesUploadEnableUrl + '/' + data_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getDisapprobe', err);
        }
    }

    getUploadDetDisable(data_id, ques_id) {
        try {
            return this.http.get
                (this.QuesUploadDetDisableUrl + '/' + data_id + '/' + ques_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getApprobe', err);
        }
    }

    getUploadDetEnable(data_id, ques_id) {
        try {
            return this.http.get
                (this.QuesUploadDetEnableUrl + '/' + data_id + '/' + ques_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getDisapprobe', err);
        }
    }

    postUploadExcelFile(file) {
        const fd = new FormData();
        try {
            fd.append('image', file, file.name);
        } catch (err) {
            console.log('error_postUploadExcelFile', err);
        }
        return this.http
            .post(this.QuesUploadExcelUrl, fd, { headers: this.httpHelper.getHeaderUploadFileAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }
}
