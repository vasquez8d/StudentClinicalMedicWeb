import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class ClassService {

    private ClassListlUrl       = `${this.globalValues.urlClass()}/listxcourse`;
    private ClassListlEnableUrl = `${this.globalValues.urlClass()}/listxcourseenable`;
    private ClassRegisterUrl    = `${this.globalValues.urlClass()}/create`;
    private ClassDetailsUrl     = `${this.globalValues.urlClass()}/details`;
    private ClassUpdateUrl      = `${this.globalValues.urlClass()}/update`;
    private ClassDisableUrl     = `${this.globalValues.urlClass()}/delete`;
    private ClassEnableUrl      = `${this.globalValues.urlClass()}/enable`;
    private ClassUpdateFileNameUrl = `${this.globalValues.urlClass()}/updatefilename`;

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    getClassList(cor_id){
        try {
            return this.http.get
                (this.ClassListlUrl + '/' + cor_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getUsersList', err);
        }
    }

    getClassEnableList(cor_id){
        try {
            return this.http.get
                (this.ClassListlEnableUrl + '/' + cor_id, { headers: this.httpHelper.getHeaderAuth() })
                .map(res => {
                    const result = res.json();
                    return result;
                });
        } catch (err) {
            console.log('error_getUsersList', err);
        }
    }

    postClassRegister(data) {
        return this.http
            .post(this.ClassRegisterUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getClassDetails(class_id){
        return this.http.get
            (this.ClassDetailsUrl + '/' + class_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    postClassUpdate(class_data){
        return this.http
            .post(this.ClassUpdateUrl, class_data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getEnableClass(class_id){
        return this.http.get
            (this.ClassEnableUrl + '/' + class_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getDisableClass(class_id){
        return this.http.get
            (this.ClassDisableUrl + '/' + class_id, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }

    getClassJson(dataRegisterCourse1: any, dataRegisterCourse2: any, user_id: any, cor_id: any) {

        var class_video_type = dataRegisterCourse2.class_video_type;
        var class_video_embed = '';

        if (class_video_type == 1) {
            var video_embed = '';
            var video_sub = [''];
            var video_id = '';
            video_embed = dataRegisterCourse2.class_video_embed.split('/video/');
            video_sub = video_embed[1].split('"');
            video_id = video_sub[0];
            class_video_embed = 'https://player.vimeo.com/video/' + video_id;
        } else {
            class_video_embed = dataRegisterCourse2.class_video_embed;
        }

        const dataClass = {
            class_tittle: dataRegisterCourse1.class_tittle,
            class_desc: dataRegisterCourse1.class_desc,
            class_video_embed: class_video_embed,
            class_video_type: dataRegisterCourse2.class_video_type,
            cor_id: cor_id,
            usu_registro: 'web',
            usu_reg_id: user_id,
            class_time: dataRegisterCourse2.class_time,
        };

        return dataClass;
    }

    postUpdateFileName(data) {
        return this.http
            .post(this.ClassUpdateFileNameUrl, data, { headers: this.httpHelper.getHeaderAuth() })
            .map(res => {
                const result = res.json();
                return result;
            });
    }
}
