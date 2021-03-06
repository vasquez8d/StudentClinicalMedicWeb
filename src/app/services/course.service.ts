import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class CourseService {

    private CourseListlUrl          = `${this.globalValues.urlCourse()}/list`;
    private CourseEnableUrl         = `${this.globalValues.urlCourse()}/enable`;
    private CourseDisableUrl        = `${this.globalValues.urlCourse()}/delete`;
    private CourseDetailsUrl        = `${this.globalValues.urlCourse()}/details`;
    private CourseUpdateUrl         = `${this.globalValues.urlCourse()}/update`;
    private CourseUploadImageUrl    = `${this.globalValues.urlCourse()}/uploadimage`;
    private CourseRegisterUrl       = `${this.globalValues.urlCourse()}/create`;
    private CourseUpdateFileNameUrl = `${this.globalValues.urlCourse()}/updatefilename`;
    private CourseDetailsUpdateUrl  = `${this.globalValues.urlCourse()}/detailsupdate`;
    private CourseUsersListUrl      = `${this.globalValues.urlCourse()}/listuserxcourse`;
    private CourseListxUserUrl      = `${this.globalValues.urlCourse()}/listxuser`;
    private CourseListxTeacherUrl   = `${this.globalValues.urlCourse()}/listxteacher`;

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    getCourseList() {
        try {
            return this.http.get
                (this.CourseListlUrl, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getUsersList', err);
        }
    }

    getCourseListxUser(user_id){
        return this.http.get
        (this.CourseListxUserUrl + '/' + user_id, { headers: this.httpHelper.getHeaderAuth() })
        .map(res => {
            const result = res.json();
            return result;
        });
    }

    getCourseListxTeacher(user_id) {
        return this.http.get
            (this.CourseListxTeacherUrl + '/' + user_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getUsersListCourse(cor_id){
        return this.http.get
        (this.CourseUsersListUrl + '/' + cor_id, { headers: this.httpHelper.getHeaderAuth() })
        .map(res => {
            const result = res.json();
            return result;
        });
    }

    getCourseDetailsUpdate(cor_id){
        const UrlGetDetails = this.CourseDetailsUpdateUrl + '/' + cor_id;
        try {
            return this.http.get
                (UrlGetDetails, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getCourseDetailsUpdate', err);
        }
    }

    postCourseUpdate(course){
        return this.http
            .post(this.CourseUpdateUrl, course, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    postCourseRegister(course){
        return this.http
            .post(this.CourseRegisterUrl, course, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getCourseDetails(cor_id){
        const UrlGetDetails = this.CourseDetailsUrl + '/' + cor_id;
        try {
            return this.http.get
                (UrlGetDetails, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getCourseDetails', err);
        }
    }

    getEnableCourse(cor_id){
        const UserEnableUrl = this.CourseEnableUrl + '/' + cor_id;
        try {
            return this.http.get
                (UserEnableUrl, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getEnableCourse', err);
        }
    }

    getDisableCourse(cor_id){
        const UserEnableUrl = this.CourseDisableUrl + '/' + cor_id;
        try {
            return this.http.get
                (UserEnableUrl, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getDisableCourse', err);
        }
    }

    postUploadCourseImage(file){
        const fd = new FormData();
        try{
            fd.append('image', file, file.name);
        } catch (err){
            console.log(err);
        }
        return this.http
            .post(this.CourseUploadImageUrl, fd, { headers: this.httpHelper.getHeaderUploadFileAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    postUpdateFileName(data){
        return this.http
            .post(this.CourseUpdateFileNameUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getCourseJson(datastep1, 
                  datastep2, 
                  user_id){
        const dataCourse = {
            cor_name: datastep1.cor_name,
            cor_slug: this.validateSlugCourse(datastep1.cor_name),
            cor_price: datastep1.cor_price,
            user_doc_id: datastep1.user_doc_id,
            cat_cor_id: datastep1.cat_cor_id,
            cor_des: datastep2.cor_des,
            cor_intro: datastep2.cor_intro,
            usu_registro: 'web',
            user_reg_id: user_id
        };
        return dataCourse;
    }

    validateSlugCourse(cor_name){
        let cor_slug = this.getCleanedString(cor_name);
        cor_slug = cor_slug.toLowerCase().split(' ').join('-');
        return cor_slug;
    }

    getCleanedString(cadena) {
        const specialChars = '!@#$^&%*()+=-[]\/{}|:<>?,_°`~';
        for (let i = 0; i < specialChars.length; i++) {
            cadena = cadena.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
        }
        cadena = cadena.replace(/á/g, 'a');
        cadena = cadena.replace(/é/g, 'e');
        cadena = cadena.replace(/í/g, 'i');
        cadena = cadena.replace(/ó/g, 'o');
        cadena = cadena.replace(/ú/g, 'u');
        cadena = cadena.replace(/ñ/g, 'n');
        cadena = cadena.replace(/[0-9]/g, '');
        cadena = cadena.replace(/\s*$/, '');
        return cadena;
    }
}
