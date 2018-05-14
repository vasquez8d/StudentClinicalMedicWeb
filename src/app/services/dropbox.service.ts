import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { GlobalValues } from '../global/globalvalues';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class DropBoxService {

    private DropBoxUploadUrl          = 'https://content.dropboxapi.com/2/files/upload';
    private DropBoxSharedUrl          = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';
    private DropBoxDeleteUrl          = 'https://api.dropboxapi.com/2/files/delete_v2';

    constructor(
        private http: Http,
        private globalValues: GlobalValues,
        private httpHelper: HttpHelper
    ) { }

    postSharedLink(data){
        return this.http.post(this.DropBoxSharedUrl, data, { headers: this.httpHelper.getDropBoxSharedHeader() })
            .map(res => {
                return res.json();
            });
    }

    postUploadCorFile(file, newFileName){
        return this.http.post(this.DropBoxUploadUrl, file, { headers: this.httpHelper.getDropBoxUploadCorHeader(newFileName.trim())})
                        .map(res => {
                            return res.json();
                        });
    }

    postUploadClassFile(file, newFileName){
        return this.http.post(this.DropBoxUploadUrl, file, { headers: this.httpHelper.getDropBoxUploadClassHeader(newFileName.trim()) })
            .map(res => {
                return res.json();
            });
    }

    postUploadVoucherFile(file, newFileName){
        return this.http.post(this.DropBoxUploadUrl, file, { headers: this.httpHelper.getDropBoxUploadVoucherHeader(newFileName.trim())})
            .map(res => {
                return res.json();
            });
    }

    postDeleteImage(path){
        return this.http.post(this.DropBoxDeleteUrl, JSON.stringify(path), { headers: this.httpHelper.getDropBoxDeleteHeader() })
            .map(res => {
                return res.json();
            });
    }
}
